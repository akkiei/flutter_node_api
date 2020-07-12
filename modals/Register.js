const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, minlength: 3, maxlength: 255 },
		email: { type: String, required: true, unique: true },
		username: { type: String, unique: true, required: true },
		password: { type: String, required: true },
		appname: { type: String, required: true }
	},
	{ collection: 'users' }
);

const Register = mongoose.model('Register', registerSchema);

// module.Register = Register;
module.registerSchema = registerSchema;
