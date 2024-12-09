import React, { useState, useEffect } from 'react';
import { bookService, reservationService } from '../services/apiService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';
import "../style/BookList.css";

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    if (location.state?.query) {
      setQuery(location.state.query);
      handleSearch(location.state.query);
    }

    // if (window.performance) {
    //   if (performance.navigation.type === 1) { // Detect page refresh
    //     navigate('/bookList');
    //   }
    // }
  }, [location.state, navigate]);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await bookService.searchBooks(searchQuery || query);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleReserve = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not logged in.');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      const objectIdUserId = new mongoose.Types.ObjectId(userId);
      const objectIdBookId = new mongoose.Types.ObjectId(bookId);

      const response = await reservationService.reserveBook({
        userId: objectIdUserId,
        bookId: objectIdBookId,
      });

      alert('Book reserved successfully!');
    } catch (error) {
      alert('Failed to reserve book.');
      console.error('Error reserving book:', error);
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
              <p>{book.title}</p>
              <p>{book.author}</p>
              <p>{book.publisher}, {book.year_published}</p>
              <p>{book.category}</p>
              {/* Reserve button to call handleReserve function */}
              <button onClick={() => handleReserve(book._id)}>Reserve</button>
              {/* Details button to navigate to the dynamic detail page */}
              <Link to={`/book/${book._id}`}>
              <button>Details</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default SearchBooks;
