const mongoose = require('mongoose');

// Define the schema for the Book model
const BookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publisher: { type: String },
  year_published: { type: String },
  category: { type: String },
  quantity: { type: String }
});

// Export the model using the schema
module.exports = mongoose.model('Book', BookSchema);  // Make sure BookSchema is used here
