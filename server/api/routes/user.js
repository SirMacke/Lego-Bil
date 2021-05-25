const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { User } = require('../../models/user.js');

router.get('/', auth, async(req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(400).send('Invalid id.');

  const token = user.generateAuthToken();

  let response = {
    username: user.username,
    isAdmin: user.isAdmin,
    auth: token
  }

  res.status(200).json(response);
});

module.exports = router;