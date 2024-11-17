import React, { useState, useEffect } from 'react';
import { bookService, borrowService, reservationService } from '../services/apiService';
import SearchBooks from './SearchBooks';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [reservationRequests, setReservationRequests] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    year_published: '',
    category: '',
    quantity: '',
  });
  const [message, setMessage] = useState('');

  // Fetch books, borrow records, and reservations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await bookService.getBooks();
        const borrowResponse = await borrowService.getAllBorrowRecords();
        const reservationResponse = await reservationService.getAllReservations();

        setBooks(booksResponse.data);
        setBorrowRecords(borrowResponse.data);
        setReservationRequests(reservationResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle adding a book
  const handleAddBook = async () => {
    try {
      if (!form.title || !form.author || !form.isbn) {
        setMessage('Title, Author, and ISBN are required.');
        return;
      }

      const newBook = {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        publisher: form.publisher || '',
        year_published: form.year_published || null,
        category: form.category || '',
        quantity: form.quantity || 1,
      };

      const response = await bookService.addBook(newBook);
      setBooks([...books, response.data]);
      setForm({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        year_published: '',
        category: '',
        quantity: '',
      });
      setMessage('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage('Failed to add book.');
    }
  };

  // Handle editing a book
  const handleEditBook = async () => {
    try {
      if (!form.title || !form.author || !form.isbn) {
        setMessage('Title, Author, and ISBN are required.');
        return;
      }

      const updatedBook = {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        publisher: form.publisher || '',
        year_published: form.year_published || null,
        category: form.category || '',
        quantity: form.quantity || 1,
      };

      const response = await bookService.updateBook(selectedBook._id, updatedBook);
      setBooks(books.map((book) => (book._id === selectedBook._id ? response.data : book)));
      setSelectedBook(null);
      setForm({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        year_published: '',
        category: '',
        quantity: '',
      });
      setMessage('Book updated successfully!');
    } catch (error) {
      console.error('Error editing book:', error);
      setMessage('Failed to edit book.');
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
      setMessage('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      setMessage('Failed to delete book.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Search Books */}
      <SearchBooks />

      {/* Add or Edit Book */}
      <div>
        <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        />
        <input
          type="text"
          placeholder="Publisher"
          value={form.publisher}
          onChange={(e) => setForm({ ...form, publisher: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year Published"
          value={form.year_published}
          onChange={(e) => setForm({ ...form, year_published: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <button onClick={selectedBook ? handleEditBook : handleAddBook}>
          {selectedBook ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      {/* Book List */}
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} (ISBN: {book.isbn})
            <button onClick={() => setSelectedBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Borrow Records */}
      <h2>Borrow Records</h2>
      <ul>
        {borrowRecords.map((record) => (
          <li key={record._id}>
            {record.bookTitle} borrowed by {record.userName} on {new Date(record.borrowedDate).toLocaleDateString()}
          </li>
        ))}
      </ul>

      {/* Reservation Requests */}
      <h2>Reservation Requests</h2>
      <ul>
        {reservationRequests.map((request) => (
          <li key={request._id}>
            {request.bookTitle} reserved by {request.userName} on {new Date(request.reservedDate).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
