// /backend/models/ReservationTable.js

const mongoose = require('mongoose');

// Define the schema for the ReservationTable model
const ReservationTableSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 如果需要用户信息，可以加上 ref
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // 添加 ref: 'Book'
    bookTitle: { type: String, required: true }, 
    reservationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Reserved', 'Canceled'], default: 'Reserved' }
});

// Export the model using the schema
module.exports = mongoose.model('ReservationTable', ReservationTableSchema);
