const express = require('express');
const router = express.Router();
const Login = require('../modals/Login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
	res.send('This is the test url for API');
});

router.post('/', async (req, res) => {
	const user = req.body.username;
	const pass = req.body.password;
	const app = req.body.appname;

	const isUser = await Login.findOne({
		username: user
	});
	console.log(isUser);
	
	if (isUser) {
		const checkUser = await bcrypt.compare(pass, isUser.password);
		if(!checkUser){
			res.status(400).send("Username not found");
		}
		else{
			const jwToken = jwt.sign({
				_id : isUser._id,
				username : isUser.username,
				password : isUser.password
			},"JWT_private_key");
			res.send(jwToken);
		}
	}else{
		res.status(400).send("Username not found");
	}
	// authenticate here with JWT

	
});

module.exports = router;
