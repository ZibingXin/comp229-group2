const mongoose = require('mongoose');

// Define the schema for the BorrowRecord model
const BorrowRecordSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },           // Foreign key to Users table
  book_id: { type: Number, required: true },           // Foreign key to Books table
  borrow_time: { type: Date, default: Date.now },      // Borrow time defaults to current date
  return_time: { type: Date },                         // Expected return time
  actual_return_time: { type: Date },                  // Actual return time
  status: { 
    type: String, 
    required: true, 
    enum: ['Borrowed', 'Returned']                     // Enum for status, allows only specific values
  }
});

// Export the model using the schema
module.exports = mongoose.model('BorrowRecord', BorrowRecordSchema);  // Make sure BorrowRecordSchema is used here
