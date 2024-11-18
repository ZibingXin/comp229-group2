// /backend/routes/ReservationTableRoutes.js
// Manages book reservations

const express = require('express');
const { reserveBook, cancelReservation, getReservationById, getAllReservations, deleteAllReservations } = require('../controllers/reservationTableController');
const router = express.Router();

router.post('/', reserveBook);                   // Reserve a book
router.put('/:id/cancel', cancelReservation);    // Cancel a reservation
router.get('/:id', getReservationById);          // Get a reservation by id
router.get('/', getAllReservations);             // Get all reservations
router.delete('/', deleteAllReservations);       // Delete all reservations

module.exports = router;
