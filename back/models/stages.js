const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  // creatorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
  creatorId: String
});

module.exports = mongoose.model('Stage', contactsSchema);
