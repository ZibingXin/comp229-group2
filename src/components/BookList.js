import React, { useState } from 'react';
import { reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';

const BookList = ({ books }) => {
  const [message, setMessage] = useState('');

  const handleReserve = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User not logged in.');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Convert userId and bookId to ObjectId
      const objectIdUserId = new mongoose.Types.ObjectId(userId);
      const objectIdBookId = new mongoose.Types.ObjectId(bookId);

      const response = await reservationService.reserveBook({ 
        userId: objectIdUserId, 
        bookId: objectIdBookId 
      });

      setMessage('Book reserved successfully!');
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
