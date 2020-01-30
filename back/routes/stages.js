const express = require('express');
const Stage = require('../models/stages');
const Lead = require('../models/leads');

const router = express.Router();


router.route('/')
  .get(async (req, res) => {
    const arrayForUser = [];
    const result = await Stage.find({});
    if (req.session.user.type === 'admin') {
      await res.json(result);
    } else if (req.session.user.type === 'user') {
      for (let stageIndex = 0; stageIndex < result.length; stageIndex++) {
        arrayForUser.push(result[stageIndex]);
        const tempCards = [];
        for (let cardIndex = 0; cardIndex < result[stageIndex].cards.length; cardIndex++) {
          if (result[stageIndex].cards[cardIndex].creatorId == req.session.user._id) {
            tempCards.push(result[stageIndex].cards[cardIndex]);
          }
        }
        arrayForUser[stageIndex].cards = tempCards;
      }
      await res.json(arrayForUser);
    }
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
    const stageForDeleting = await Stage.findOne({ _id: req.body.id });

    if (stageForDeleting.cards.length > 0) {
      stageForDeleting.cards.map(async (element) => {
        await Lead.findOneAndDelete({ _id: element._id });
      });
      await Stage.findOneAndDelete({ _id: req.body.id });
      await res.json({
        isDeleted: true
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
