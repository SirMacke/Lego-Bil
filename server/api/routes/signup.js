const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User, validateUser } = require('../../models/user.js');

router.post('/', validate(validateUser), async(req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['username', 'email', 'password']));
  user.isAdmin = false;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  let response = {
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    auth: token
  }

  res.status(200).json(response);
});

module.exports = router;