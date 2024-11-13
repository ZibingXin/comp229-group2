// routes/bookRoutes.js
const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// 1. Add a Book (POST /api/books)
router.post('/', async (req, res) => {
  const { book_id, title, author, isbn, publisher, year_published, category, quantity } = req.body;

  try {
    const newBook = new Book({
      book_id,
      title,
      author,
      isbn,
      publisher,
      year_published,
      category,
      quantity
    });
    
    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all Books (GET /api/books)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get a single Book by ID (GET /api/books/:bookId)
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Update a Book (PUT /api/books/:bookId)
router.put('/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { title, author, isbn, publisher, year_published, category, quantity } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, isbn, publisher, year_published, category, quantity },
      { new: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Delete a Book (DELETE /api/books/:bookId)
router.delete('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Search for Books (GET /api/books/search)
router.get('/search', async (req, res) => {
  const { title, author, category } = req.query;

  try {
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    if (author) query.author = { $regex: author, $options: 'i' };
    if (category) query.category = { $regex: category, $options: 'i' };

    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
