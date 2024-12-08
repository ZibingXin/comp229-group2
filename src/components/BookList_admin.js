import React from 'react';

const BookList = ({ books, handleSelectBook, handleDeleteBook }) => (
  <div class="list">
    <h2>Book List</h2>
    <ul>
      {books.map((book) => (
        <li key={book._id}>
          {book.title} by {book.author} (ISBN: {book.isbn}) - Quantity: {book.quantity}
          <button onClick={() => handleSelectBook(book)}>Edit</button>
          <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default BookList;
