const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  creatorId: String,
  created: Date,
  updated: Date
});

module.exports = mongoose.model('Note', notesSchema);
