const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      console.log('GET logout - session terminated');
    } catch (error) {
      next(error);
    }
  } else {
    console.log('GET logout - user is not logged in');
  }
});

module.exports = router;
