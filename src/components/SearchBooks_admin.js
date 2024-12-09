import React, { useState } from 'react';
import { bookService, reservationService } from '../services/apiService';
import "../style/BookList.css";

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
      alert('Failed to search books.');
    }
  };

  return (
    <div className="list">
      <div className='search'>      
        <input
        type="text"
        placeholder="Enter book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => handleSearch()}>Search</button>
      </div>

    <p>Searched Results:</p>
    <ul>
      {books.map((book) => (
        <li className="book-details" key={book._id}>
          {book.image && (
            <img 
              src={book.image || "https://via.placeholder.com/100x150"} 
              alt={`Cover of ${book.title}`} 
              style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
            />
          )}
          <div className="book-info">
          <p>{book.title} by {book.author} (ISBN: {book.isbn})</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Published Year:</strong> {book.year_published}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p>{book.description}</p>
            <p>Quantity: {book.quantity}</p>
            <button onClick={() => handleSelectBook(book)}>Edit</button>
            <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
    <p>{message}</p>
  </div>      
  );
};

export default SearchBooks;
