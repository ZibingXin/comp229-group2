import React, { useEffect, useState } from 'react';
import { borrowService } from '../services/apiService';

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await borrowService.getUserBorrowRecords();
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div>
      <h1>Borrowed Books</h1>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} (Borrowed on: {book.borrowedDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowedBooks;
