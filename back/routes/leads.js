const express = require('express');

// const { sessionChecker } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET request to /leads');
});

module.exports = router;
