const express = require('express');
const {
  borrowBook,
  returnBook,
  getBorrowedBooks,
  getBorrowRecordsByUserId,
  getBorrowRecordById,
  deleteAllBorrowRecords 
} = require('../controllers/borrowController.js');

const router = express.Router();

// POST: Borrow a book
router.post('/', borrowBook);

// GET: Get all borrowed books
router.get('/', getBorrowedBooks);

// GET: Get borrow records by user_id
router.get('/user/:user_id', getBorrowRecordsByUserId);

// GET: Get borrow record by record ID
router.get('/:id', getBorrowRecordById);

// PUT: Return a borrowed book
router.put('/return', returnBook);

// DELETE: Delete all borrow records
router.delete('/', deleteAllBorrowRecords); 

module.exports = router;
