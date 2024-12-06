import React from 'react';
import "../style/borrowedBooks.css"; // 引入 borrowedBooks.css 文件

const ReservationManager = ({
  userId,
  setUserId,
  reservations,
  handleSearchReservations,
  handleBorrowBook,
}) => (
  <div className="reservation-manager">
    <h2>Manage Reservations</h2>
    <input
      type="text"
      placeholder="Enter User ID"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
      className="manager-input"
    />
    <button onClick={handleSearchReservations} className="manager-button">
      Search Reservations
    </button>
    <ul className="reservations-list">
      {reservations.map((reservation) => (
        <li className="reservation-item" key={reservation._id}>
          <span className="book-title">{reservation.bookTitle}</span>
          <span> - Reserved on {reservation.reservationDate}</span>
          <button
            onClick={() => handleBorrowBook(reservation._id, reservation.bookId)}
            className="borrow-button"
          >
            Borrow
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default ReservationManager;
