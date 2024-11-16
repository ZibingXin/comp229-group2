const BorrowRecord = require('../models/BorrowRecord');

// 1. Borrow a Book (POST /api/borrows)
exports.borrowBook = async (req, res) => {
    try {
        const { user_id, book_id, borrow_time, return_time, status } = req.body;
        
        // Check if there is an existing borrow record that has not been returned
        const existingBorrow = await BorrowRecord.findOne({ user_id, book_id, status: 'Borrowed' });
        if (existingBorrow) {
            return res.status(400).json({ error: 'This book is already borrowed and not yet returned' });
        }

        const borrowRecord = new BorrowRecord({
            user_id,
            book_id,
            borrow_time: borrow_time || new Date(),
            return_time,
            status: status || 'Borrowed'
        });

        await borrowRecord.save();
        res.status(201).json(borrowRecord);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 2. Get all Borrow Records (GET /api/borrows)
exports.getBorrowedBooks = async (req, res) => {
    try {
        const borrowRecords = await BorrowRecord.find();
        res.status(200).json(borrowRecords);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 3. Get Borrow Records by User ID (GET /api/borrows/user/:user_id)
exports.getBorrowRecordsByUserId = async (req, res) => {
    try {
        const borrowRecords = await BorrowRecord.find({ user_id: req.params.user_id });
        if (borrowRecords.length === 0) {
            return res.status(404).json({ error: 'No borrow records found for this user' });
        }
        res.status(200).json(borrowRecords);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 4. Get Borrow Record by ID (GET /api/borrows/:id)
exports.getBorrowRecordById = async (req, res) => {
    try {
        const borrowRecord = await BorrowRecord.findById(req.params.id);
        if (!borrowRecord) {
            return res.status(404).json({ error: 'Borrow record not found' });
        }
        res.status(200).json(borrowRecord);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 5. Return a Book by user_id and book_id (PUT /api/borrows/return)
exports.returnBook = async (req, res) => {
    try {
        const { user_id, book_id, actual_return_time } = req.body;

        // Find the borrow record
        const borrowRecord = await BorrowRecord.findOneAndUpdate(
            { user_id, book_id, status: 'Borrowed' }, // Search criteria
            { 
                actual_return_time: actual_return_time || new Date(), 
                status: 'Returned' // Update the status to 'Returned'
            }, // Update fields
            { new: true } // Return the updated record
        );

        if (!borrowRecord) {
            return res.status(404).json({ error: 'No active borrow record found for this user and book' });
        }

        res.status(200).json({ message: 'Book returned successfully!', borrowRecord });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};