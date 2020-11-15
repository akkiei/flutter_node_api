const express = require('express');
const router = express.Router();
const Login = require('../service/service.Login');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', async (req, res) => {
	const LoginObj = new Login();
	const result = await LoginObj.authenticateUser(req.body);
	if (result == -1) {
		res.status(400).send({ message: 'Username/password incorrect' });
	} else if (result == -2) {
		res.status(400).send({ message: "User does'nt exist" });
	} else {
		const jwToken = result['x-auth-token'];
		res.cookie('token', jwToken, { maxAge: 300 * 1000 });

		if (jwToken != undefined || jwToken != {}) res.status(200).send(result.message);
	}
});

router.get('/bankCsv/:username', async (req, res) => {
	const LoginObj = new Login();
	const result = await LoginObj.authenticateJWT(req);
	if (result == -1) {
		res.status(401).send({ message: 'Token expired/ unauthorized' });
	} else if (result == -2) {
		res.status(400).end();
	} else {
		const username = req.params.username;
		const bankStatment = await LoginObj.getBankStatment(username);
		if (bankStatment === null) res.status(404).send("Bank details not found");
		else res.status(200).send(bankStatment);
	}
});

router.post('/uploadCsv/:username', upload.single('bankStatement'), async (req, res) => {
	const LoginObj = new Login();
	const result = await LoginObj.authenticateJWT(req);
	if (result == -1) {
		res.status(401).send({ message: 'Token expired/ unauthorized' });
	} else if (result == -2) {
		res.status(400).end();
	} else {
		const username = req.params.username;
		const bankStatment = await LoginObj.updateBankStatement(username, req.file.filename);
		res.status(200).send(bankStatment);
	}
});

router.post('/transferMoney/:sendername/:receivername/:amount', async (req, res) => {
	const LoginObj = new Login();
	const result = await LoginObj.authenticateJWT(req);
	if (result == -1) {
		res.status(401).send({ message: 'Token expired/ unauthorized' });
	} else if (result == -2) {
		res.status(400).end();
	} else {
		const sendername = req.params.sendername;
		const receivername = req.params.receivername;
		const amount = req.params.amount;
		const moneyTransfer = await LoginObj.transferMoney(sendername, receivername, amount);
		if (moneyTransfer == -1) res.status(400).send('Receiver does not exist');
		else if (moneyTransfer == -2) res.status(400).send('Insufficient balance');
		else res.status(200).send('Transfer successful');
	}
});

module.exports = router;
