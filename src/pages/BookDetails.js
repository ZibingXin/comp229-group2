

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../style/BookDetails.css"; // Create this CSS file for styling

function BookDetails() {
  const { id } = useParams(); // Get book ID from the URL parameter
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch book details from the API
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/books/${id}`); // Update API URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="book-details-container">
      <Link to="/books" className="back-to-list">← Back to list</Link>
      <div className="book-details">
        <img
          src={book.image || "https://via.placeholder.com/200x300"}
          alt={book.title}
          className="book-image"
        />
        <div className="book-info">
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Published Year:</strong> {book.year_published}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Category:</strong> {book.category}</p>
          <p>{book.description}</p>
          <button className="reserve-button">Reserve</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
