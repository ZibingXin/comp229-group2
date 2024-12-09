// /backend/routes/ContactRoutes.js
const express = require('express');
const { submitContactForm, getAllContacts } = require('../controllers/contactController');
const router = express.Router();

router.post('/submit', submitContactForm); 
router.get('/getall', getAllContacts); 

module.exports = router;
