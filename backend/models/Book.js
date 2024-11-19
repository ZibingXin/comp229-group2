// /backend/models/Book.js

const mongoose = require('mongoose');

// Define the schema for the Book model
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String },
  year_published: { type: Number },
  category: { type: String },
  quantity: { type: Number },
  image:{ type: String },
  description:{ type: String }
});

// Export the model using the schema
module.exports = mongoose.model('Book', BookSchema);
