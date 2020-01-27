const express = require("express");
const Stage = require("../models/stages");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    // const result = await Stage.find({});
    const { _id } = req.session.user;
    // console.log(req.session.user);

    const userStages = await Stage.find({ creatorId: _id });
    // console.log(userStages);
    // await res.json(result);
    await res.json(userStages);
  })
  .post(async (req, res) => {
    const { name } = req.body;
    const { _id } = req.session.user;
    req.session.user.stageName = name;
    console.log(req.session.user);

    const newStage = new Stage({ name, creatorId: _id });
    try {
      await newStage.save();
      await res.json({ newStage });
    } catch (error) {
      res.json("Error saving to db");
    }
  })
  .delete(async (req, res) => {
    const { laneId } = req.params;
    try {
      await Stage.findOneAndDelete({ _id: laneId });
      await res.json(true);
    } catch (e) {
      await res.json(false);
    }
  });

router.route("/created/:userId").get(async (req, res) => {
  const { userId } = req.params;
  const result = await Stage.find({ creatorId: userId });
  await res.json(result);
});

router
  .route("/:id")
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
    const updated = await Stage.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
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
