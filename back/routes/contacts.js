const express = require('express');
const Contact = require('../models/contacts');

// const { sessionChecker } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const contacts = Contact.find();
    res.json({ contacts });
  })
  .post(async (req, res) => {
    const {
      name, company, companyDetails, email, phone, address, created
    } = req.body;
    const newContact = new Contact({
      name,
      company,
      companyDetails,
      email,
      phone,
      address,
      created
    });
    try {
      await newContact.save();
      await res.json({
        status: 'saved',
        contact: newContact
      });
    } catch (error) {
      res.send('Error saving to db');
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    res.json({ contact });
  });

module.exports = router;
