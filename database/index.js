const mongo = require('mongoose');

const url = 'mongodb+srv://admin:admin123@cluster0.ribsz.mongodb.net/flutter_default?retryWrites=true&w=majority';
mongo
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log(mongo.connection.readyState);
		console.log('connected to DB');
	})
	.catch((err) => console.log(err + 'hey '));

module.exports = mongo;
