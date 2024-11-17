import React, { useEffect, useState } from 'react';
import { reservationService } from '../services/apiService';

const ReservedBooks = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const response = await reservationService.getAllReservations();
        setReservedBooks(response.data);
      } catch (error) {
        console.error('Error fetching reserved books:', error);
      }
    };

    fetchReservedBooks();
  }, []);

  const handleCancel = async (reservationId) => {
    try {
      const response = await reservationService.cancelReservation(reservationId);
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
            {book.bookTitle} 
            <button onClick={() => handleCancel(book._id)}>Cancel Reservation</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default ReservedBooks;
