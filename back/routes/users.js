const express = require('express');

// const { sessionChecker } = require('../middleware/auth');
// const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET request to /users');
});

module.exports = router;
