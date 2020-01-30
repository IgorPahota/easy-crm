const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  stageId: { type: mongoose.Schema.ObjectId, ref: 'Stage' },
  // contactId: { type: mongoose.Schema.ObjectId, ref: 'Contact', required: true },
  // creatorId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  price: { type: Number, default: 0 },
  details: { type: String },
  created: { type: Date },
  updated: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Lead', contactsSchema);
