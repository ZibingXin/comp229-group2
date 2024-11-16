import React from 'react';
import SearchBooks from './SearchBooks';
import BookList from './BookList';
import BorrowedBooks from './BorrowedBooks';
import ReservedBooks from './ReservedBooks';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <SearchBooks />
      <BorrowedBooks />
      <ReservedBooks />
    </div>
  );
};

export default UserDashboard;
