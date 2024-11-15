// routes/bookRoutes.js
const express = require('express');
const { addBook, getBooks, getBookById, updateBookById, deleteBookById, searchBooks } = require('../controllers/bookController');

const router = express.Router();

router.post('/', addBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);


module.exports = router;
