import React from 'react';

const ReservationManager = ({
  userId,
  setUserId,
  reservations,
  handleSearchReservations,
  handleBorrowBook,
}) => (
  <div>
    <h2>Manage Reservations</h2>
    <input
      type="text"
      placeholder="Enter User ID"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    />
    <button onClick={handleSearchReservations}>Search Reservations</button>
    <ul>
      {reservations.map((reservation) => (
        <li key={reservation._id}>
          {reservation.bookTitle} - Reserved on {reservation.reservationDate}
          <button onClick={() => handleBorrowBook(reservation._id, reservation.bookId)}>Borrow</button>
        </li>
      ))}
    </ul>
  </div>
);

export default ReservationManager;
