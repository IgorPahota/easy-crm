const express = require('express');
const Note = require('../models/notes');

// const { sessionChecker } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    if (req.session) {
      const result = await Note.find({});
      await res.send(result);
    } else {
      console.log('Not logged in');
    }
  })
  .post(async (req, res) => {
    const { text, creatorId } = req.body;
    const newNote = new Note({
      text,
      creatorId,
      created: Date.now(),
      updated: null
    });
    try {
      await newNote.save();
      await res.json({ newNote });
    } catch (error) {
      res.send('Error saving to db');
    }
  });

router.route('/created/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    const result = await Note.find({ creatorId: userId });
    await res.json(result);
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const note = await Note.findById(id);
    await res.json({ note });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const update = {
      text: req.body.text,
      updated: Date.now()
    };
    const updated = await Note.findOneAndUpdate({ _id: id }, update, { new: true });
    await res.json({ updated });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Note.findOneAndDelete({ _id: id });
      // true в json?
      await res.json(true);
    } catch (e) {
      await res.json(false);
    }
  });

module.exports = router;
