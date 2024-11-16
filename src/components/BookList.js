import React, { useState } from 'react';
import { reservationService } from '../services/apiService';

const BookList = ({ books }) => {
  const [message, setMessage] = useState('');

  const handleReserve = async (bookId) => {
    try {
      const response = await reservationService.reserveBook({ bookId });
      setMessage(`Book reserved successfully!`);
    } catch (error) {
      setMessage('Failed to reserve book.');
      console.error('Error reserving book:', error);
    }
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author}
            <button onClick={() => handleReserve(book._id)}>Reserve</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default BookList;
