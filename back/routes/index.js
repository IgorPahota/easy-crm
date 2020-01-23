const express = require('express');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const saltRounds = 10;
const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
  res.send('GET to /');
  // res.redirect('/login');
});

router
  .route('/signup')
  .get(sessionChecker, (req, res) => {
    res.send('GET signup');
  })
  .post(async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds)
      });
      await user.save();
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      next(error);
    }
  });

router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.send('GET login');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.redirect('/dashboard');
    } else {
      // res.redirect('/login');
    }
  });

router.get('/dashboard', (req, res) => {
  const { user } = req.session;
  if (req.session.user) {
    res.send('GET dashboard for logged user');
  } else {
    res.send('GET dashboard for unlogged user');
  }
});

router.get('/logout', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.send('GET logout - session terminated');
    } catch (error) {
      next(error);
    }
  } else {
    res.send('GET logout - user is not logged in');
  }
});

module.exports = router;
