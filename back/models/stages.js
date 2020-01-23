const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Contact', contactsSchema);
