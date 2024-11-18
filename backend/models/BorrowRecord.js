// /backend/models/BorrowRecord.js

const mongoose = require('mongoose');

// Define the schema for the BorrowRecord model
const BorrowRecordSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  borrow_time: { type: Date, default: Date.now },      // Borrow time defaults to current date
  return_time: { type: Date },                         // Expected return time
  actual_return_time: { type: Date },                  // Actual return time
  status: { 
    type: String, 
    required: true, 
    enum: ['Borrowed', 'Returned']                     // Enum for status
  }
});

// Export the model using the schema
module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema);
