const mongoose = require('mongoose');

// Define the schema for the ReservationTable model
const ReservationTableSchema = new mongoose.Schema({
    userId: { type: Number, required: true},
    bookId: { type: Number, required: true},
    reservationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Reserved', 'Canceled'], default: 'Reserved' }
});

// Export the model using the schema
module.exports = mongoose.model('ReservationTable', ReservationTableSchema);