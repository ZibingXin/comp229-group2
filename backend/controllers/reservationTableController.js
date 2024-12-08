// /backend/controllers/reservationTableController.js

const ReservationTable = require('../models/ReservationTable');
const Book = require('../models/Book');
const mongoose = require('mongoose');

// 1. Reserve a Book (POST /api/reservations)
exports.reserveBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid userId or bookId' });
        }

        // Find the book
        const book = await Book.findById(bookId);
        if (!book || book.quantity <= 0) {
            return res.status(400).json({ error: 'Book is not available for reservation' });
        }

        // Create a reservation with bookTitle
        const reservation = new ReservationTable({ 
            userId, 
            bookId, 
            bookTitle: book.title // Save book title in the reservation
        });
        await reservation.save();

        // Update book quantity
        book.quantity -= 1;
        await book.save();

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 2. Cancel a Reservation (PUT /api/reservations/:id/cancel)
exports.cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid reservation ID' });
        }

        // Find the reservation
        const reservation = await ReservationTable.findById(id);
        if (!reservation || reservation.status === 'Canceled') {
            return res.status(404).json({ error: 'Reservation not found or already canceled' });
        }

        // Cancel the reservation
        reservation.status = 'Canceled';
        await reservation.save();

        // Update book quantity
        const book = await Book.findById(reservation.bookId);
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        res.status(200).json({ message: 'Reservation canceled successfully', reservation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 3. Get Reservation by ID (GET /api/reservations/:id)
exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid reservation ID' });
        }

        // Find the reservation and populate user info
        const reservation = await ReservationTable.findById(id)
            .populate('userId', 'name').sort({ reservationDate: -1 });;
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 4. Get All Reservations (GET /api/reservations)
exports.getAllReservations = async (req, res) => {
    try {
        // Find all reservations and populate user info
        const reservations = await ReservationTable.find()
            .populate('userId', 'name').sort({ reservationDate: -1 });;
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

//5. Get Reservations by UserId
exports.getUserReservations = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        const reservations = await ReservationTable.find({ userId })
        .populate('bookId', 'title quantity image').sort({ reservationDate: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching user reservations:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.finishReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid reservation ID' });
        }

        const reservation = await ReservationTable.findById(id);
        if (!reservation || reservation.status !== 'Reserved') {
            return res.status(404).json({ error: 'Reservation not found or not in Reserved status' });
        }

        reservation.status = 'Finished';
        await reservation.save();

        res.status(200).json({ message: 'Reservation status updated to Finished', reservation });
    } catch (error) {
        console.error('Error updating reservation status:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};




// Delets all reservations (for testing)
exports.deleteAllReservations = async (req, res) => {
    try {
        const result = await ReservationTable.deleteMany();
        res.status(200).json({ message: 'All reservations deleted successfully!', deletedCount: result.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

