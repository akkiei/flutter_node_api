const express = require('express');
const middleware = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const morgan = require('morgan');
// add any custom middlewares and use them here

middleware.use(bodyParser.json());
middleware.use(cookieParser());
middleware.use(morgan('combined'));

module.exports = middleware;
