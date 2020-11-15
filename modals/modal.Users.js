const mongoose = require('mongoose');

const Users = new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	account_no : {type : Number},
	balance: { type: Number },
	bankDetails: { type: JSON }
});

module.exports = mongoose.model('Users', Users);
