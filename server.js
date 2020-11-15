const express = require('express');
const app = express();
const login = require('./routes/routes.Login');
const register = require('./routes/routes.Register');
const middlewares = require('./middlewares/middleware');
// const mongo = require('./database/index');
const os = require('os');
const mongo = require('mongoose');
const EventEmitter = require('events');

const url = 'mongodb+srv://admin:admin123@cluster0.5gjxo.mongodb.net/freecharge?retryWrites=true&w=majority';
mongo
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('connected to DB');
	})
	.catch((err) => console.log(err));

app.use(middlewares); // here we are using all the middlewares

app.use('/api/login', login); // uses login route defined in login.js
app.use('/api/register', register);

app.listen(8000, () => console.log(`listening on port 8000`));

module.exports = app;
