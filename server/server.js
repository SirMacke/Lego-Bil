const express = require('express');
var app = express();

const http = require('http').Server(app);

let io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${parseInt(process.env.PORT) + 1}`,
    methods: ["GET", "POST"]
  }
});

module.exports.io = io;

require('./startup/routes.js')(app);
require('./startup/db.js')();
require('./startup/config.js')();
require('./startup/validation.js')();
require('./startup/prod.js')(app);

var port = process.env.PORT || 3000;
const server = http.listen(port, () => console.log('info', `Listening on port ${port}...`));

exports.server = server;