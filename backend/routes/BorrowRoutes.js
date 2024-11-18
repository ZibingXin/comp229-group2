// /backend/routes/BorrowRoutes.js
// Handles operations for borrowing and returning books

const express = require('express');
const { borrowBook, returnBook, getBorrowedBooks, getBorrowRecordsByUserId, getBorrowRecordById, deleteAllBorrowRecords } = require('../controllers/borrowController.js');
const router = express.Router();

router.post('/', borrowBook);                                // Borrow a book
router.get('/', getBorrowedBooks);                           // Get all borrowed books
router.get('/user/:user_id', getBorrowRecordsByUserId);      // Get borrow records by user_id
router.get('/:id', getBorrowRecordById);                     // Get borrow record by record ID
router.put('/return', returnBook);                           // Return a borrowed book
router.delete('/', deleteAllBorrowRecords);                  // Delete all borrow records

module.exports = router;
