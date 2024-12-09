// /backend/models/Contact.js
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Automatically track submission time
});

module.exports = mongoose.model('Contact', ContactSchema);
