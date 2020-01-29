const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  creatorId: String,
  cards: Array
});

module.exports = mongoose.model('Stage', contactsSchema);
