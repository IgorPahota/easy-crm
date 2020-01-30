const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  type: { type: String, default: 'user' },
  created: Date,
  updated: Date
});

module.exports = mongoose.model('User', userSchema);
