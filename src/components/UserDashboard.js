import React, { useEffect, useState } from 'react';
import SearchBooks from './SearchBooks';
import BookList from './BookList';
import BorrowedBooks from './BorrowedBooks';
import ReservedBooks from './ReservedBooks';
import { bookService } from '../services/apiService';

const UserDashboard = () => {
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();
        setBooks(response.data); 
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>User Dashboard</h1>
      
      <SearchBooks />
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <BookList books={books} /> 
      )}
      
      <BorrowedBooks />
      <ReservedBooks />
    </div>
  );
};

export default UserDashboard;
