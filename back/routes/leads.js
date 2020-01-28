const express = require('express');
const Lead = require('../models/leads');
const Stage = require('../models/stages');
// const { sessionChecker } = require('../middleware/auth');
const router = express.Router();


router.route('/')
  .get(async (req, res) => {
    const result = await Lead.find({});
    await res.send(result);
  })
  .post(async (req, res) => {
    // console.log(req.body);
    const {
      title, stageId, description, cardId
    } = req.body;
    // console.log(title, stageId, description);
    // const foundedStage = await Stage.findOne({ _id: stageId });
    // console.log(foundedStage);
    // foundedStage.cards.push({
    //   id: cardId,
    //   title,
    //   description
    // });
    // console.log(foundedStage);
    // await foundedStage.save();

    const newLead = new Lead({
      name: title,
      stageId,
      details: description,
      created: Date.now(),
      updated: Date.now()
    });
    await newLead.save();
    const foundedStage = await Stage.findOne({ _id: stageId });
    // console.log(foundedStage);
    foundedStage.cards.push(newLead);
    // console.log(foundedStage);
    await foundedStage.save();
    // try {
    //   await newLead.save();
    //   await res.json({ newLead });
    // } catch (error) {
    //   res.send('Error saving to db');
    // }
  })
  .patch(async (req, res) => {
    const { fromLaneId, toLaneId, cardId } = req.body;
    const movedCard = await Lead.findOne({ _id: cardId });
    movedCard.stageId = toLaneId;
    await movedCard.save();

    const stageFrom = await Stage.findOne({ _id: fromLaneId });
    const arrayWithoutMovedCard = stageFrom.cards.filter((card) => card.title !== movedCard.name);
    console.log(arrayWithoutMovedCard);
    stageFrom.cards = arrayWithoutMovedCard;
    await stageFrom.save();


    const stageTo = await Stage.findOne({ _id: toLaneId });
    stageTo.cards.push(movedCard);
    await stageTo.save();
  })
  .delete(async (req, res) => {
    const { cardId, stageId } = req.body;
    await Lead.findOneAndDelete({ _id: cardId });
    const foundedStage = await Stage.findOne({ _id: stageId });
    foundedStage.cards.map(element=>{
      if (element._id == cardId) {
        console.log(element)
        console.log(foundedStage.cards.indexOf(element));
        foundedStage.cards.splice(foundedStage.cards.indexOf(element))
      }
    });
    await foundedStage.save();
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
