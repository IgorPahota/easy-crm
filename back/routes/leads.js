const express = require('express');
const Lead = require('../models/leads');
const Stage = require('../models/stages');
// const { sessionChecker } = require('../middleware/auth');
const router = express.Router();


router.route('/')
  .get(async (req, res) => {
    const result = await Lead.find({}).populate('creatorId');
    await res.send(result);
  })
  .post(async (req, res) => {
    const {
      title, stageId, description, cardId
    } = req.body;
    const newLead = new Lead({
      name: title,
      stageId,
      details: description,
      created: Date.now(),
      updated: Date.now(),
      creatorId: req.session.user._id
    });
    await newLead.save();
    const foundedStage = await Stage.findOne({ _id: stageId });
    foundedStage.cards.push(newLead);
    await foundedStage.save();
    res.end();
  })
  .put(async (req, res) => {
    const {
      fromLaneId, toLaneId, cardId, index
    } = req.body;
    const movedCard = await Lead.findOne({ _id: cardId });
    movedCard.stageId = toLaneId;
    await movedCard.save();

    const stageFrom = await Stage.findOne({ _id: fromLaneId });
    stageFrom.cards.map((element) => {
      if (element._id === cardId) {
        stageFrom.cards.splice(stageFrom.cards.indexOf(element), 1);
      }
    });
    await stageFrom.save();
    const stageTo = await Stage.findOne({ _id: toLaneId });
    const arrayForStageTo = [
      ...stageTo.cards.slice(0, index),
      movedCard,
      ...stageTo.cards.slice(index)
    ];
    stageTo.cards = arrayForStageTo;
    await stageTo.save();
    res.end();
  })
  .delete(async (req, res) => {
    const { cardId, stageId } = req.body;
    await Lead.findOneAndDelete({ _id: cardId });
    const foundedStage = await Stage.findOne({ _id: stageId });
    foundedStage.cards.map((element) => {
      if (element._id == cardId) {
        foundedStage.cards.splice(foundedStage.cards.indexOf(element));
      }
    });
    await foundedStage.save();
    res.end();
  });

router.route('/contacts/:leadId')
  .get(async (req, res) => {
    const { leadId } = req.params;
    const result = await Lead.findById(leadId);
    await res.send(result);
  })
  .patch(async (req, res) => {
    const { leadId } = req.params;
    const { contactId } = req.body;
    const updatedLead = await Lead.findOneAndUpdate(
      { _id: leadId },
      { $addToSet: { leadcontacts: contactId } },
      { new: true }
    )
      .populate('leadcontacts');
    const upd = updatedLead.leadcontacts.find((element) => element.id === contactId);
    console.log('leadcontacts after patch', updatedLead.leadcontacts.length);
    await res.json({ upd });
  })
  .delete(async (req, res) => {
    const { leadId } = req.params;
    const { contactId } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      leadId,
      { $pull: { leadcontacts: contactId } }, { safe: true, upsert: true }
    ).populate('leadcontacts');
    console.log('todel', contactId, 'upd', updatedLead.leadcontacts);
    await res.json({ updatedLead });
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const lead = await Lead.findById(id)
      .populate('stageId')
      .populate('leadcontacts');
    await res.json({ lead });
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
