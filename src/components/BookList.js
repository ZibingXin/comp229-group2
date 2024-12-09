import React, { useState } from 'react';
import { reservationService } from '../services/apiService';
import { jwtDecode } from 'jwt-decode';
import mongoose from 'mongoose';
import { Link } from 'react-router-dom'; // Import Link for navigation
import "../style/BookList.css";

const BookList = ({ books }) => {
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return books.slice(startIndex, startIndex + itemsPerPage);
  };

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
        {getCurrentPageBooks().map((book) => (
          <li className='book-details' key={book._id}>
      
            {/* Display book cover image, if available */}
            {book.image  && (
              <img 
                src={book.image || "https://via.placeholder.com/100x150"} 
                alt={`Cover of ${book.title}`} 
                style={{ width: '100px', height: '150px', objectFit: 'cover' }} 
              />
            )}
            <div className='book-info'>
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
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <br></br>
    </div>  
  );
};

export default BookList;
