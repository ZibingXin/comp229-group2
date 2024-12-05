import React from 'react';
import "../style/borrowedBooks.css"; // 引入 borrowedBooks.css 文件

const BorrowedBooksManager = ({
  userId,
  setUserId,
  borrowedBooks,
  handleSearchBorrowedBooks,
  handleReturnBook,
}) => (
  <div className="borrowed-books-manager">
    <h2>Manage Borrowed Books</h2>
    <input
      type="text"
      placeholder="Enter User ID"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      className="manager-input"
    />
    <button onClick={handleSearchBorrowedBooks} className="manager-button">
      Search Borrowed Books
    </button>
    <ul className="borrowed-books-list">
      {borrowedBooks.map((record) => (
        <li className="borrowed-book-item" key={record._id}>
          <span className="book-title">{record.book_id?.title || 'Title not available'}</span>
          <span> - Borrowed on {record.borrow_time}</span>
          <span> - Status: {record.status}</span>
          <button
            onClick={() => handleReturnBook(record._id, record.book_id._id)}
            className="return-button"
          >
            Return
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default BorrowedBooksManager;
