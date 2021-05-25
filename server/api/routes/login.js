const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validate = require('../../middleware/validate.js');
const { User, validateUser } = require('../../models/user.js');

router.post('/', validate(validateUser), async(req, res) => {
  let user = await User.findOne({ username: req.body.usernameOrEmail });
  if (!user) user = await User.findOne({ email: req.body.usernameOrEmail });
  if (!user) return res.status(400).send('Invalid username, email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username or password.');

  const token = user.generateAuthToken();
  res.cookie('auth', token);
  
  let response = {
    username: user.username,
    isAdmin: user.isAdmin,
    auth: token
  }

  res.status(200).json(response);
});

module.exports = router;