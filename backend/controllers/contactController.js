// /backend/controllers/contactController.js
const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
  try {
    const contactData = req.body;
    const newContact = new Contact(contactData);
    await newContact.save();
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to submit form. Please try again later.' });
  }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 }); 
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contact submissions:', error);
        res.status(500).json({ error: 'Failed to fetch contact submissions.' });
    }
};