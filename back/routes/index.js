const express = require('express');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const router = express.Router();


router.get('/dashboard', (req, res) => {
  const { user } = req.session;
  if (req.session.user) {
    res.send('GET dashboard for logged user');
  } else {
    res.send('GET dashboard for unlogged user');
  }
});

// router.get('/logout', async (req, res, next) => {
//   if (req.session.user) {
//     try {
//       await req.session.destroy();
//       res.clearCookie('user_sid');
//       res.send('GET logout - session terminated');
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     res.send('GET logout - user is not logged in');
//   }
// });

module.exports = router;
