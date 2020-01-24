const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.json({
        isLoggedIn: false
      });
    } catch (error) {
      res.json({
        error
      });
    }
  } else {
    res.json({
      error: 'user is not logged in'
    });
  }
});

module.exports = router;
