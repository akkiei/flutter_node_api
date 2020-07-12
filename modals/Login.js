const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true, index: true, required: true },
		password: { type: String, required: true },
		appname: { type: String, required: true }
	},
	{ collection: 'users' }
);
// mongo.logins.createIndex({ username: 1 }, { unique: true });

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
