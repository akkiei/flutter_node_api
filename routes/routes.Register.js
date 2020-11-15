const express = require('express');
const router = express.Router();
const registerService = require('../service/service.Register');

router.get('/', (req, res) => {
	res.send('This is the test url for API');
});

router.post('/', async (req, res) => {
	const registerServiceObj = new registerService();
	const result = await registerServiceObj.AddUser(req.body);
	if (result == -1 || result == [] || result == undefined)
		res.send({
			message: 'Unable to Register',
			status: 500
		});
	else if(result == -2){
		res.send({
			message: 'User already exists',
			status: 200
		});
	}
	else {
		res.send(result);
	}
});

module.exports = router;
