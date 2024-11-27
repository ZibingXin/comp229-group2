// /backend/routes/bookRoutes.js
// Manages CRUD operations for books in the library

const express = require('express');
const { addBook, getBooks, getBookById, updateBookById, deleteBookById, searchBooks } = require('../controllers/bookController');
const router = express.Router();

router.post('/', addBook);              // Create a new book
router.get('/', getBooks);              // Get all books
router.get('/search', searchBooks);     // Search for books by keyword
router.get('/:id', getBookById);        // Get a book by id
router.put('/:id', updateBookById);     // Update a book by id
router.delete('/:id', deleteBookById);  // Delete a book by id

module.exports = router;

