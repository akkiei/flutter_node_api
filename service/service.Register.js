const Register = require('../modals/modal.Users');
const mongoose = require('mongoose');
const getHashed = require('../Hash');
const jwt = require('jsonwebtoken');

class RegisterService {
	async AddUser(params) {
		// Need to add unique 8 digit number

		const pass = await getHashed(params.password);
		params.password = pass;
		params.account_no = Math.floor((Math.random() + 1) * 10000000);

		const isValid = await Register.findOne(
			{
				username: params.username
			},
			(err, data) => {
				if (!err) {
					return data;
				}
			}
		);

		if (isValid === null) {
			const newUser = new Register(params);
			let result = await newUser.save().catch((err) => {
				if (err) return -1;
			});
			if (result === -1 || result === []) return -1;
			return {
				name: result.name,
				'user name': result.username,
				account_no : result.account_no
			};
		} else {
			return -2;
		}
	}
}

module.exports = RegisterService;
