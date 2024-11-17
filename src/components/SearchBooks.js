import React, { useState } from 'react';
import { bookService, reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  // Search books
  const handleSearch = async () => {
    try {
      const response = await bookService.searchBooks(query);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  // Reserve a book
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
        bookId: objectIdBookId,
      });

      setMessage('Book reserved successfully!');
    } catch (error) {
      setMessage('Failed to reserve book.');
      console.error('Error reserving book:', error);
    }
  };

  return (
    <div>
      <h1>Search Books</h1>
      <input
        type="text"
        placeholder="Enter book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
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

export default SearchBooks;
