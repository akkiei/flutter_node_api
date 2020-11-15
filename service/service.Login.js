const Users = require('../modals/modal.Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const csv = require('csvtojson');
const fs = require('fs');
class LoginService {
	async authenticateUser(params) {
		const username = params.username;
		const password = params.password;

		const isUser = await Users.findOne({
			username: username
		}).lean();
		if (isUser) {
			const checkUser = await bcrypt.compare(password, isUser.password);
			if (!checkUser) {
				return -1;
			} else {
				const jwToken = jwt.sign(
					{
						_id: isUser._id,
						username: isUser.username,
						password: isUser.password
					},
					'JWT_private_key',
					{
						algorithm: 'HS256',
						expiresIn: 300
					}
				);
				const result = {};
				result['x-auth-token'] = jwToken;
				if (Object.prototype.hasOwnProperty.call(isUser, 'bankDetails')) result.message = isUser.bankDetails;
				else result.message = 'Upload a CSV';
				return result;
			}
		} else {
			return -2;
		}
	}

	async authenticateJWT(req) {
		const token = req.cookies.token;
		try {
			const payload = jwt.verify(token, 'JWT_private_key');
		} catch (e) {
			if (e instanceof jwt.JsonWebTokenError) {
				return -1;
			}
			return -2;
		}
		return 0;
	}

	async getBankStatment(username) {
		const user = await Users.findOne({
			username: username
		});
		if (user && Object.prototype.hasOwnProperty.call(user.toObject(), 'bankDetails')) return user.bankDetails;
		return null;
	}

	avgMonthlyBalance(json) {
		// skip 0th row
		let deposits = Number(json[0]['Closing Balance']);
		let credits = 0;
		json.forEach((dayTrx) => {
			deposits += Number(dayTrx.Deposit);
			credits += Number(dayTrx.Withdraw);
		});
		const depCre = deposits - credits;
		if (depCre <= 0) return 0;
		return depCre / 12;
	}

	creditLimit(avgMonBal) {
		return avgMonBal * 1.2;
	}

	async formatCSVtoJSON(filename) {
		const path = `./uploads/${filename}`;
		const fileJSON = csv().fromFile(path);
		try {
			fs.unlinkSync(path);
		} catch (err) {
			console.error(err);
		}
		const avgMonBal = this.avgMonthlyBalance(fileJSON);
		const creditLim = this.creditLimit(avgMonBal);
		return {
			'average monthly balance': avgMonBal,
			'credit limit': creditLim
		};
	}

	async updateBankStatement(username, filename) {
		const user = await Users.findOne({
			username: username
		});
		const calcValues = await this.formatCSVtoJSON(filename);
		user['bankDetails'] = calcValues;
		user['balance'] = calcValues['average monthly balance'] * 12;
		await user.save();
		return calcValues;
	}

	async transferMoney(senderName, receiverName, amount) {
		const sender = await Users.findOne({
			username: senderName
		});
		const receiver = await Users.findOne({
			username: receiverName
		});
		console.log(amount);

		if (receiver) {
			if (
				Object.prototype.hasOwnProperty.call(sender.toObject(), 'balance') &&
				Object.prototype.hasOwnProperty.call(receiver.toObject(), 'balance')
			) {
				const senderBal = Number(sender.balance);
				if (senderBal < 1000 || senderBal - Number(amount) < 1000) {
					return -2;
				} else {
					sender.balance -= Number(amount);
					receiver.balance += Number(amount);
					await sender.save();
					await receiver.save();
					return 0;
				}
			} else {
				return -2;
			}
		} else {
			return -1;
		}
	}
}
module.exports = LoginService;
