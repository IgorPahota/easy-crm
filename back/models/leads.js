const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  stageID: { type: mongoose.Schema.ObjectId, ref: 'Stage' },
  contactId: { type: mongoose.Schema.ObjectId, ref: 'Contact' },
  creatorId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  price: { type: Number },
  details: { type: String },
  created: { type: Date },
  updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Contact', contactsSchema);
