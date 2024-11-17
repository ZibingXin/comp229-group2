import React, { useEffect, useState } from 'react';
import { borrowService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';


const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('User not logged in.');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await borrowService.getUserBorrowRecords(userId);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error('Error fetching borrowed books:', error);
        setMessage('Failed to fetch borrowed books.');
      }
    };

    fetchBorrowedBooks();
  }, []);

  return (
    <div>
      <h1>Borrowed Books</h1>
      <ul>
        {borrowedBooks.map((record) => (
          <li key={record._id}>
            {record.book_id.title} (Status: {record.status})
            {record.borrow_time && ` Borrowed on: ${new Date(record.borrow_time).toLocaleDateString()}`}
          </li>
        ))}
      </ul>
      <p>{message}</p>
    </div>
  );
};

export default BorrowedBooks;
