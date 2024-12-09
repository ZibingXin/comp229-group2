import React, { useState } from "react";
import "../style/BookList.css";

const BookList = ({ books, handleSelectBook, handleDeleteBook }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const getCurrentPageBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return books.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="list">
      <h2>Book List</h2>
      <ul>
      {getCurrentPageBooks().map((book) => (
          <li className='book-details' key={book._id}>
            <img src={book.image|| "https://via.placeholder.com/100x150"} alt={book.title} style={{ width: '100px', height: '150px' }} />
            <div className='book-info'>          
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
