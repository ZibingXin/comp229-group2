import React, { useState, useEffect } from 'react';
import { bookService, borrowService, reservationService } from '../services/apiService';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservationRequests, setReservationRequests] = useState([]);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all books on load
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Failed to fetch books.');
      }
    };

    fetchBooks();
  }, []);

  // Search Reservations
  const handleSearchReservations = async () => {
    try {
      if (!userId) {
        setMessage('User ID is required.');
        return;
      }

      const response = await reservationService.getAllReservations();
      const filteredReservations = response.data.filter((r) => r.userId === userId);
      setReservationRequests(filteredReservations);
      setMessage('');
    } catch (error) {
      console.error('Error fetching reservations:', error.response?.data || error.message);
      setMessage('Failed to fetch reservations.');
    }
  };

  // Borrow a Book
  const handleBorrowBook = async (reservationId, bookId) => {
    try {
      if (!userId || !bookId) {
        setMessage('User ID and Book ID are required.');
        return;
      }

      const borrowData = {
        user_id: userId,
        book_id: bookId,
        borrow_time: new Date().toISOString(), // Ensure valid date format
        status: 'Borrowed',
      };

      console.log('Borrow Request:', borrowData); // Debug log
      await borrowService.borrowBook(borrowData);
      setMessage('Book borrowed successfully!');
      handleSearchReservations(); // Refresh reservations
    } catch (error) {
      console.error('Error borrowing book:', error.response?.data || error.message);
      setMessage('Failed to borrow book.');
    }
  };

  // Search Borrowed Books
  const handleSearchBorrowedBooks = async () => {
    try {
      if (!userId) {
        setMessage('User ID is required.');
        return;
      }

      console.log('Fetching borrowed books for user ID:', userId); // Debug log
      const response = await borrowService.getBorrowRecordsByUserId(userId);
      console.log('Borrowed books data:', response.data); // Debug log

      setBorrowedBooks(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching borrowed books:', error.response?.data || error.message);
      setMessage('Failed to fetch borrowed books.');
    }
  };

  // Return a Book
  const handleReturnBook = async (bookId) => {
    try {
      if (!userId || !bookId) {
        setMessage('User ID and Book ID are required.');
        return;
      }

      const returnData = {
        user_id: userId,
        book_id: bookId,
        actual_return_time: new Date().toISOString(), // Ensure valid date format
      };

      console.log('Return Request:', returnData); // Debug log
      await borrowService.returnBook(returnData);
      setMessage('Book returned successfully!');
      handleSearchBorrowedBooks(); // Refresh borrowed books
    } catch (error) {
      console.error('Error returning book:', error.response?.data || error.message);
      setMessage('Failed to return book.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Book List */}
      <div>
        <h2>Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              {book.title} by {book.author} (ISBN: {book.isbn})
            </li>
          ))}
        </ul>
      </div>

      {/* Manage Borrowing */}
      <div>
        <h2>Manage Borrowing</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearchReservations}>Search Reservations</button>
        <ul>
          {reservationRequests.map((request) => (
            <li key={request._id}>
              {request.bookTitle} (Reserved by: {request.userName})
              <button onClick={() => handleBorrowBook(request._id, request.bookId)}>
                Borrow
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Manage Returns */}
      <div>
        <h2>Manage Returns</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSearchBorrowedBooks}>Search Borrowed Books</button>
        <ul>
          {borrowedBooks.map((borrowed) => (
            <li key={borrowed._id}>
              {borrowed.bookTitle} by {borrowed.author} (Borrowed on: {new Date(borrowed.borrowedDate).toLocaleDateString()})
              <button onClick={() => handleReturnBook(borrowed.book_id)}>Return</button>
            </li>
          ))}
        </ul>
      </div>

      <p>{message}</p>
    </div>
  );
};

export default AdminDashboard;
