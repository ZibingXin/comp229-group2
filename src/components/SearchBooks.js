import React, { useState, useEffect } from 'react';
import { bookService, reservationService } from '../services/apiService';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // 用于接收从 SearchBar 传递的数据

  useEffect(() => {
    // 自动检测是否有从 SearchBar 传递的搜索关键词
    if (location.state?.query) {
      setQuery(location.state.query);
      handleSearch(location.state.query);
    }

    // 检测页面刷新并跳转
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
        setMessage('User not logged in.');
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

      setMessage('Book reserved successfully!');
    } catch (error) {
      setMessage('Failed to reserve book.');
      console.error('Error reserving book:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter book title or author"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Search</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <p>{book.title} by {book.author}</p>
            {book.image && (
              <img 
                src={book.image} 
                alt={`Cover of ${book.title}`} 
                style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
              />
            )}
            <button onClick={() => handleReserve(book._id)}>Reserve</button>
            <Link to={`/book/${book._id}`}>
              <button>Details</button>
            </Link>
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default SearchBooks;
