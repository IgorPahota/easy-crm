const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');


const saltRounds = 10;
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, saltRounds)
    });
    await user.save();
    req.session.user = user;
    await res.json({
      isLoggedIn: true,
      username: req.session.user.username,
      email: req.session.user.email,
      // eslint-disable-next-line no-underscore-dangle
      id: req.session.user._id
    });
  } catch (error) {
    await res.json({
      isLoggedIn: false
    });
  }
});


module.exports = router;
