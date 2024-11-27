// /backend/models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String },
    year_published: { type: Number },
    category: { type: String },
    quantity: { type: Number },
    image: { type: String },
    description: { type: String },
});

// Register the Book model with Mongoose
const Book = mongoose.model('Book', bookSchema);

// Export the Book model
module.exports = Book;
