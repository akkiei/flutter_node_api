const express = require('express');
const router = express.Router();
const { registerSchema } = require('../modals/Register');
const mongoose = require('mongoose');
const getHashed = require('../Hash');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send('This is the test url for API');
});

router.post('/', async (req, res) => {
	const user = req.body.username;
	const pass = await getHashed(req.body.password);
	const app = req.body.appname;
	const name = req.body.name;
	const email = req.body.email;
	console.log(pass);

	const Register = mongoose.model('Register', registerSchema);
	const register = new Register({
		name: name,
		email: email,
		username: user,
		password: pass,
		appname: app
	});
	const isValid = await Register.findOne(
		{
			email: email
		},
		(err, data) => {
			if (!err) {
				return data;
			}
		}
	);

	if (isValid === null) {
		const result = await register.save().catch((err) => {
			res.send(err.message);
		});
		// authenticate here with JWT
		console.log(result);
		const jwToken = jwt.sign(
			{
				_id: register._id,
				username: register.username,
				password: register.password
			},
			'JWT_private_key'
		);
		res.header('x-auth-token',jwToken).send(register);
	} else res.status(400).send('User/email already exists');
});

module.exports = router;
