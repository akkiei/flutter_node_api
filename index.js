const os = require('os');
const EventEmitter = require('events');
const server = require('./server');
const operatingSystem = os.type();
const emitter = new EventEmitter();
