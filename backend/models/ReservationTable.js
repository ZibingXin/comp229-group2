// /backend/models/ReservationTable.js

const mongoose = require('mongoose');

// Define the schema for the ReservationTable model
const ReservationTableSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, 
    bookTitle: { type: String, required: true }, 
    reservationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Reserved', 'Canceled','Finished'], default: 'Reserved' }
});

// Export the model using the schema
module.exports = mongoose.model('ReservationTable', ReservationTableSchema);
