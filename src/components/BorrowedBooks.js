import React, { useEffect, useState } from "react";
import { borrowService } from "../services/apiService";
import {jwtDecode} from "jwt-decode";
import "../style/borrowedBooks.css"; // 确保创建了这个 CSS 文件

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("User not logged in.");
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await borrowService.getUserBorrowRecords(userId);
        setBorrowedBooks(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        alert("Failed to fetch borrowed books.");
      }
    };

    fetchBorrowedBooks();
  }, []);

  if (borrowedBooks.length === 0 && !message) {
    return <p>Loading...</p>;
  }

  return (
    <div className="borrowed-books-container">
      <h1>Borrow Records</h1>
      {message && <p className="error-message">{message}</p>}
      <div className="borrowed-books-list">
        {borrowedBooks.map((record) => (
          <div className="borrowed-book-card" key={record._id}>
            <div className="book-content">
              <img
                src={record.book_id?.image || "https://via.placeholder.com/150x200"}
                alt={record.book_id?.title || "Book cover"}
                className="book-cover"
              />
              <div className="book-info">
                <h2 className="book-title">{record.book_id?.title || "Unknown Title"}</h2>
                <span className="status-label returned">{record.status}</span>
                <br></br>
                <br></br>
                <div className="borrow-details">
                  <p>
                    <strong>Borrow Date:</strong>{" "}
                    {record.borrow_time
                      ? new Date(record.borrow_time).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Planned Return Date:</strong>{" "}
                    {record.return_time
                      ? new Date(record.return_time).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Actual Return Date:</strong>{" "}
                    {record.actual_return_time
                      ? new Date(record.actual_return_time).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowedBooks;
