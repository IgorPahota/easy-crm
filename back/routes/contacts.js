const express = require('express');
const Contact = require('../models/contacts');

// const { sessionChecker } = require('../middleware/auth');
const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    if (req.session) {
      const result = await Contact.find({});
      await res.send(result);
    } else {
      console.log('Not logged in');
    }
  })
  .post(async (req, res) => {
    const {
      name, company, companyDetails, email, phone, address, creatorId
    } = req.body;
    const newContact = new Contact({
      name,
      company,
      companyDetails,
      email,
      phone,
      address,
      creatorId,
      created: Date.now(),
      updated: Date.now()
    });
    try {
      await newContact.save();
      await res.json({ newContact });
    } catch (error) {
      res.send('Error saving to db');
    }
  });

router.route('/created/:userId')
  .get(async (req, res) => {
    const { userId } = req.params;
    const result = await Contact.find({ creatorId: userId });
    await res.json(result);
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    await res.json({ contact });
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const update = {
      name: req.body.name,
      company: req.body.company,
      companyDetails: req.body.companyDetails,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      updated: Date.now()
    };
    const updated = await Contact.findOneAndUpdate({ _id: id }, update, { new: true });
    await res.json({ updated });
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      await Contact.findOneAndDelete({ _id: id });
      await res.json(true);
    } catch (e) {
      await res.json(false);
    }
  });

module.exports = router;
