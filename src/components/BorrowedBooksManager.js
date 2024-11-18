import React from 'react';

const BorrowedBooksManager = ({
  userId,
  setUserId,
  borrowedBooks,
  handleSearchBorrowedBooks,
  handleReturnBook,
}) => (
  <div>
    <h2>Manage Borrowed Books</h2>
    <input
      type="text"
      placeholder="Enter User ID"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    />
    <button onClick={handleSearchBorrowedBooks}>Search Borrowed Books</button>
    <ul>
      {borrowedBooks.map((record) => (
        <li key={record._id}>
          {record.book_id?.title || 'Title not available'} - Borrowed on {record.borrow_time} - Status: {record.status}
          <button onClick={() => handleReturnBook(record._id, record.book_id._id)}>Return</button>
        </li>
      ))}
    </ul>
  </div>
);

export default BorrowedBooksManager;
