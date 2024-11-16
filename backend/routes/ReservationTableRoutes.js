const express = require('express');
const { reserveBook, cancelReservation, getReservationById, getAllReservations } = require('../controllers/reservationTableController');

const router = express.Router();

router.post('/', reserveBook);
router.put('/:id/cancel', cancelReservation);
router.get('/:id', getReservationById);
router.get('/', getAllReservations);

module.exports = router;