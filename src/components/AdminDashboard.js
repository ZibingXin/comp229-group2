import React, { useState, useEffect } from 'react';
import { bookService, borrowService, reservationService } from '../services/apiService';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState('');
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

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Error fetching books.');
      }
    };

    fetchBooks();
  }, []);

  // Handle adding or editing a book
  const handleAddOrEditBook = async () => {
    try {
      if (!form.title || !form.author || !form.isbn) {
        setMessage('Title, Author, and ISBN are required.');
        return;
      }

      if (selectedBook) {
        const updatedBook = await bookService.updateBook(selectedBook._id, form);
        setBooks(
          books.map((book) => (book._id === selectedBook._id ? updatedBook.data : book))
        );
        setMessage('Book updated successfully!');
      } else {
        const newBook = await bookService.addBook(form);
        setBooks([...books, newBook.data]);
        setMessage('Book added successfully!');
      }

      setForm({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        year_published: '',
        category: '',
        quantity: '',
      });
      setSelectedBook(null);
    } catch (error) {
      console.error('Error saving book:', error);
      setMessage('Failed to save book.');
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publisher: book.publisher,
      year_published: book.year_published,
      category: book.category,
      quantity: book.quantity,
    });
  };

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

  const handleSearchReservations = async () => {
    try {
      const response = await reservationService.getAllReservations();
      const filteredReservations = response.data.filter((r) => r.userId === userId);
      setReservations(filteredReservations);
      setMessage('');
    } catch (error) {
      console.error('Error searching reservations:', error);
      setMessage('Failed to fetch reservations.');
    }
  };

  const handleSearchBorrowedBooks = async () => {
    try {
      const response = await borrowService.getUserBorrowRecords(userId);
      console.log(response.data); 
      setBorrowedBooks(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error searching borrowed books:', error);
      setMessage('Failed to fetch borrowed books.');
    }
  };

  const handleBorrowBook = async (reservationId, bookId) => {
    try {
      const borrowData = {
        user_id: userId,
        book_id: bookId,
      };

      await borrowService.borrowBook(borrowData);
      setMessage('Book borrowed successfully!');
      handleSearchReservations();
    } catch (error) {
      console.error('Error borrowing book:', error);
      setMessage('Failed to borrow book.');
    }
  };

  const handleReturnBook = async (borrowId) => {
    try {
      const returnData = {
        user_id: userId,
        book_id: borrowId,
      };

      await borrowService.returnBook(returnData);
      setMessage('Book returned successfully!');
      handleSearchBorrowedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      setMessage('Failed to return book.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

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
        <button onClick={handleAddOrEditBook}>
          {selectedBook ? 'Update Book' : 'Add Book'}
        </button>
        {selectedBook && (
          <button onClick={() => setSelectedBook(null)}>Cancel Edit</button>
        )}
      </div>

      <div>
        <h2>Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author} (ISBN: {book.isbn})
              <button onClick={() => handleSelectBook(book)}>Edit</button>
              <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Manage Reservations</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearchReservations}>Search Reservations</button>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              {reservation.bookTitle} - Reserved on {reservation.reservationDate}
              <button onClick={() => handleBorrowBook(reservation._id, reservation.bookId)}>Borrow</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Manage Borrowed Books</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearchBorrowedBooks}>Search Borrowed Books</button>
        <ul>
          {borrowedBooks.map((record) => (
            <li key={record._id}>
              {record.book_id.title} - Borrowed on {record.borrow_time}
              <button onClick={() => handleReturnBook(record._id)}>Return</button>
            </li>
          ))}
        </ul>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
