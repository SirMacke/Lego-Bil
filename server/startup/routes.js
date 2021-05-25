const config = require('config');
const express = require('express');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');

const enforce = require('express-sslify');
const cookieParser = require('cookie-parser');

const home = require('../api/routes/home');
const login = require('../api/routes/login');
const signup = require('../api/routes/signup');
const user = require('../api/routes/user');

const error = require('../middleware/error');

module.exports = function(app) {
  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'));
    //app.use(enforce.HTTPS({ trustProtoHeader: true }));
  }

  app.use(cors());
  app.use(morgan('tiny'));

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/routes/home', home);
  app.use('/api/routes/login', login);
  app.use('/api/routes/signup', signup);
  app.use('/api/routes/user', user);

  app.use(error);
}