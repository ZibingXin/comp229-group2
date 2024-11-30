import React, { useState, useEffect } from 'react';
import SearchBooks from '../components/SearchBooks';
import BookList from '../components/BookList';
import SearchBar from '../components/SearchBar';
import { bookService } from '../services/apiService';

const Booklist = () => {
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
        <SearchBar />
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <BookList books={books} /> 
        )}
      </div>
    );
  };

export default Booklist;