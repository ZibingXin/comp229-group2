import React, { useState } from 'react';
import { bookService, reservationService } from '../services/apiService';

const SearchBooks = ({ handleSelectBook, handleDeleteBook }) => {
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
      setMessage('Failed to search books.');
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
            <button onClick={() => handleSelectBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default SearchBooks;
