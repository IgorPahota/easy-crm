const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: String,
  companyDetails: String,
  email: String,
  phone: String,
  address: String,
  created: Date,
  updated: Date,
  creatorId: String
});

module.exports = mongoose.model('Contact', contactsSchema);
