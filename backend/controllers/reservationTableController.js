const ReservationTable = require('../models/ReservationTable');
const Book = require('../models/Book');

// 1. Reserve a Book (POST /api/reservations)
exports.reserveBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const book = await Book.findById(bookId);
        if (!book || book.quantity <= 0) {
            return res.status(400).json({ error: 'Book is not available for reservation' });
        }

        const reservation = new ReservationTable({ userId, bookId });
        await reservation.save();

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

        const reservation = await ReservationTable.findById(id);
        if (!reservation || reservation.status === 'Canceled') {
            return res.status(404).json({ error: 'Reservation not found or already canceled' });
        }

        reservation.status = 'Canceled';
        await reservation.save();

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
        const reservation = await ReservationTable.findById(req.params.id).populate('bookId', 'title').populate('userId', 'name');
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
        const reservations = await ReservationTable.find().populate('bookId', 'title').populate('userId', 'name');
        res.status(200).json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
