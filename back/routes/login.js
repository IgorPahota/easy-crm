const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/users');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    await res.json({
      isLoggedIn: true,
      username: user.username,
      email: user.email,
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      type: user.type
    });
  } else {
    await res.json({
      isLoggedIn: false
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const { _id, password } = req.session.user;
    const user = await User.findById({ _id });

    if (user.password === password) {
      await res.json({
        isLoggedIn: true,
        username: user.username,
        email: user.email,
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        type: user.type
      });
    } else {
      await res.json({
        isLoggedIn: false
      });
    }
  } catch (error) {
    await res.json({
      isLoggedIn: false
    });
  }
});

module.exports = router;
