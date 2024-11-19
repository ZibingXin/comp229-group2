import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';

const ReservedBooks = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserReservedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('User not logged in.');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        // Fetch reservations for the current user
        const response = await reservationService.getUserReservations(userId);
        setReservedBooks(response.data);
      } catch (error) {
        console.error('Error fetching reserved books:', error);
        setMessage('Failed to fetch reserved books.');
      }
    };

    fetchUserReservedBooks();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const response = await reservationService.cancelReservation(reservationId);
      setMessage(response.data.message || 'Reservation cancelled successfully!');


      // Update books quantity when a reservation is canceled
      const canceledBook = reservedBooks.find((book) => book._id === reservationId);
      if (canceledBook) {
        canceledBook.book.quantity += 1; // Increase quantity on cancel
      }

      setMessage('Reservation cancelled successfully!');
      setReservedBooks(reservedBooks.filter((book) => book._id !== reservationId));
    } catch (error) {
      setMessage('Failed to cancel reservation.');
      console.error('Error cancelling reservation:', error);
    }
  };

  return (
    <div>
      <h1>Reserved Books</h1>
      <ul>
        {reservedBooks.map((book) => (
          <li key={book._id}>
            {book.bookTitle} (Status: {book.status})
            {book.reservationDate && ` Reserved on: ${new Date(book.reservationDate).toLocaleDateString()}`}
            {book.book && ` - Quantity: ${book.book.quantity}`}
            <button onClick={() => handleCancel(book._id)}>Cancel Reservation</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default ReservedBooks;
