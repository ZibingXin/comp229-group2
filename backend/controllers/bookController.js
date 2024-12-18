// /backend/controllers/bookController.js

const Book = require('../models/Book');

// 1. Add a Book (POST /api/books)
exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn, publisher, year_published, category, quantity, image, description } = req.body;
        const existingISBN = await Book.findOne({ isbn });
        if (existingISBN) {
        return res.status(400).json({ error: 'Book with the same ISBN already exists' });
        }
        const book = new Book({ title, author, isbn, publisher, year_published, category, quantity, image, description });
        await book.save();
        res.status(201).json(book);
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 2. Get all Books (GET /api/books)
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        if (!books) {
            return res.status(404).json({ error: 'No books found' });
        }
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
// 3. Get a Book by ID (GET /api/books/:id)
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 4. Update a Book by ID (PUT /api/books/:id)
exports.updateBookById = async (req, res) => {
    try {
        const { title, author, isbn, publisher, year_published, category, quantity, image, description } = req.body;
        const existingISBN = await Book.findOne({ isbn });
        if (existingISBN && existingISBN._id.toString() !== req.params.id) {
            return res.status(400).json({ error: 'Book with the same ISBN already exists' });
        }
        const book = await Book.findByIdAndUpdate(req.params.id, { title, author, isbn, publisher, year_published, category, quantity, image, description }, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 5. Delete a Book by ID (DELETE /api/books/:id)
exports.deleteBookById = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// 6. Search for Books by keywords (GET /api/books/search?q=...)
exports.searchBooks = async (req, res) => {
    try {
        console.log('Search query:', req.query.q);
        const books = await Book.find({
            $or: [
                { title: { $regex: req.query.q || '', $options: 'i' } },
                { author: { $regex: req.query.q || '', $options: 'i' } },
                { isbn: { $regex: req.query.q || '', $options: 'i' } },
                { publisher: { $regex: req.query.q || '', $options: 'i' } },
                { category: { $regex: req.query.q || '', $options: 'i' } }
            ]
        });
        console.log('Search results:', books);
        res.status(200).json(books);
    } catch (error) {
        console.error('Error in searchBooks:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};