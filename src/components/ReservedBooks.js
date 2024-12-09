import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import "../style/borrowedBooks.css"; // 引入 borrowedBooks.css 文件

const ReservedBooks = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserReservedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('User not logged in.');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Fetch reservations for the current user
        const response = await reservationService.getUserReservations(userId);
        setReservedBooks(response.data);
      } catch (error) {
        console.error('Error fetching reserved books:', error);
        alert('Failed to fetch reserved books.');
      }
    };

    fetchUserReservedBooks();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      await reservationService.cancelReservation(reservationId);
      setReservedBooks(reservedBooks.filter((book) => book._id !== reservationId));
      alert('Reservation cancelled successfully!');
    } catch (error) {
      alert('Failed to cancel reservation.');
      console.error('Error cancelling reservation:', error);
    }
  };

  return (
    <div className="borrowed-books-container">
      <h1>Reserved Books</h1>
      {message && <p className="error-message">{message}</p>}
      <div className="borrowed-books-list">
        {reservedBooks.map((book) => (
          <div className="borrowed-book-card" key={book._id}>
            <div className="book-content">
              <img
                src={book.bookId?.image || "https://via.placeholder.com/150x200"}
                alt={book.bookTitle || "Book cover"}
                className="book-cover"
              />
              <div className="book-info">
                <h2 className="book-title">{book.bookTitle || "Unknown Title"}</h2>
                <span className="status-label reserved">{book.status}</span>
                <div className="borrow-details">
                  <p>
                    <strong>Reserved on:</strong>{" "}
                    {book.reservationDate
                      ? new Date(book.reservationDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {book.bookId?.quantity || 0}
                  </p>
                  <button onClick={() => handleCancel(book._id)} className="cancel-button">
                    Cancel Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservedBooks;
