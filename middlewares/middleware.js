const express = require('express');
const middleware = express();
const morgan = require('morgan');
// add any custom middlewares and use them here

middleware.use(express.json());
middleware.use(morgan('combined'));

module.exports = middleware;