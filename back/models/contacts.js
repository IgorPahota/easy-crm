const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: String,
  company_details: String,
  email: String,
  phone: String,
  address: String,
  created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Contact', contactsSchema);
