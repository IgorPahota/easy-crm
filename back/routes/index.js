const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
  res.send('easyCRM back');
});


module.exports = router;
