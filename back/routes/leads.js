const express = require('express');
const Lead = require('../models/leads');

// const { sessionChecker } = require('../middleware/auth');
const router = express.Router();


router.route('/')
  .get(async (req, res) => {
    const result = await Lead.find({});
    await res.send(result);
  })
  .post(async (req, res) => {
    const {
      name, stageID, contactId, creatorId, price, details
    } = req.body;
    const newLead = new Lead({
      name,
      stageID,
      contactId,
      creatorId,
      price,
      details,
      created: Date.now(),
      updated: Date.now()
    });
    try {
      await newLead.save();
      await res.json({ newLead });
    } catch (error) {
      res.send('Error saving to db');
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const lead = await Lead.findById(id);
    res.json({ lead });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const update = {
      name: req.body.name,
      stageID: req.body.stageID,
      contactId: req.body.contactId,
      price: req.body.price,
      details: req.body.details,
      updated: Date.now()
    };
    const updated = await Lead.findOneAndUpdate({ _id: id }, update, { new: true });
    await res.json({ updated });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Lead.findOneAndDelete({ _id: id });
      await res.json(true);
    } catch (e) {
      await res.json(false);
    }
  });

module.exports = router;
