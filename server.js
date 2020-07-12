const express = require('express');
const app = express();
const login = require('./routes/Login');
const register = require('./routes/Register');
const middlewares = require('./middlewares/middleware');
const mongo = require('./database/index');

app.use(middlewares); // here we are using all the middlewares

app.use('/api/login', login); // uses login route defined in login.js
app.use('/api/signup', register);

app.listen(8800, () => console.log(`listening on port 8800`));

module.exports = app;
