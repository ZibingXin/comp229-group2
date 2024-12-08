import React, { useState } from 'react';
import { reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../style/BookList.css";

const BookList = ({ books }) => {
  const [message, setMessage] = useState('');

  const handleReserve = async (bookId) => {
    try {
      // Retrieve user token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('User not logged in.'); // Set message if no user is logged in
        return;
      }

      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // Convert userId and bookId to ObjectId format (used in MongoDB)
      const objectIdUserId = new mongoose.Types.ObjectId(userId);
      const objectIdBookId = new mongoose.Types.ObjectId(bookId);

      // Call the reservation service to reserve the book
      const response = await reservationService.reserveBook({ 
        userId: objectIdUserId, 
        bookId: objectIdBookId 
      });

      // Set success message upon successful reservation
      setMessage('Book reserved successfully!');
    } catch (error) {
      // Handle any errors during reservation
      setMessage('Failed to reserve book.');
      console.error('Error reserving book:', error);
    }
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li class="book-details" key={book._id}>
            {/* Display book title and author */}
      
            {/* Display book cover image, if available */}
            {book.image && (
              <img 
                src={book.image} 
                alt={`Cover of ${book.title}`} 
                style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
              />
            )}
            <div class="book-info">
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
      {/* Display success or error message */}
      <p>{message}</p>
    </div>  
  );
};

export default BookList;
