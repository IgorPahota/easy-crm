const express = require('express');
const Stage = require('../models/stages');

const router = express.Router();


router.route('/')
  .get(async (req, res) => {
    const result = await Stage.find({});
    await res.send(result);
  })
  .post(async (req, res) => {
    const { title } = req.body;
    console.log(title);
    const newStage = new Stage({ title });
    try {
      await newStage.save();
      await res.json({ newStage });
    } catch (error) {
      res.send('Error saving to db');
    }
  })
  .delete(async (req, res) => {
    console.log(req.body.id);
    const stageForDeleting = await Stage.findOne({ _id: req.body.id });
    console.log(stageForDeleting.cards.length);
    if (stageForDeleting.cards.length > 0) {
      await res.json({
        isDeleted: false
      });
    } else {
      await Stage.findOneAndDelete({ _id: req.body.id });
      await res.json({
        isDeleted: true
      });
    }
  });

router.route('/created/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const result = await Stage.find({ creatorId: userId });
    await res.json(result);
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const stage = await Stage.findById(id);
    res.json({ stage });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const update = {
      name: req.body.name
    };
    const updated = await Stage.findOneAndUpdate({ _id: id }, update, { new: true });
    await res.json({ updated });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Stage.findOneAndDelete({ _id: id });
      await res.json(true);
    } catch (e) {
      await res.json(false);
    }
  });

module.exports = router;
