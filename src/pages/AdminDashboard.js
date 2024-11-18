import React, { useState, useEffect } from 'react';
import { bookService, borrowService, reservationService } from '../services/apiService';
import BookForm from '../components/BookForm';
import SearchBooks_admin from '../components/SearchBooks_admin';
import BookList_admin from '../components/BookList_admin';
import ReservationManager from '../components/ReservationManager';
import BorrowedBooksManager from '../components/BorrowedBooksManager';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [userId, setUserId] = useState('');
  const [form, setForm] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    year_published: '',
    category: '',
    quantity: '',
  });
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Error fetching books.');
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Message will disappear after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddOrEditBook = async () => {
    try {
      if (!form.title || !form.author || !form.isbn) {
        setMessage('Title, Author, and ISBN are required.');
        return;
      }

      if (selectedBook) {
        const updatedBook = await bookService.updateBook(selectedBook._id, form);
        setBooks(
          books.map((book) => (book._id === selectedBook._id ? updatedBook.data : book))
        );
        setMessage('Book updated successfully!');
      } else {
        const newBook = await bookService.addBook(form);
        setBooks([...books, newBook.data]);
        setMessage('Book added successfully!');
      }

      setForm({
        title: '',
        author: '',
        isbn: '',
        publisher: '',
        year_published: '',
        category: '',
        quantity: '',
      });
      setSelectedBook(null);
    } catch (error) {
      console.error('Error saving book:', error);
      setMessage('Failed to save book.');
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      publisher: book.publisher,
      year_published: book.year_published,
      category: book.category,
      quantity: book.quantity,
    });
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
      setMessage('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      setMessage('Failed to delete book.');
    }
  };

  const handleSearchReservations = async () => {
    try {
      const response = await reservationService.getAllReservations();
      const filteredReservations = response.data.filter(
        (r) => r.userId === userId && r.status !== 'Canceled'
      );
      setReservations(filteredReservations);
      setMessage('');
    } catch (error) {
      console.error('Error searching reservations:', error);
      setMessage('Failed to fetch reservations.');
    }
  };

  const handleSearchBorrowedBooks = async () => {
    try {
      const response = await borrowService.getUserBorrowRecords(userId);
      setBorrowedBooks(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error searching borrowed books:', error);
      setMessage('Failed to fetch borrowed books.');
    }
  };

  const handleBorrowBook = async (reservationId, bookId) => {
    try {
      const borrowData = {
        user_id: userId,
        book_id: bookId,
      };

      await borrowService.borrowBook(borrowData);
      setMessage('Book borrowed successfully!');
      handleSearchReservations();
    } catch (error) {
      console.error('Error borrowing book:', error);
      setMessage('Failed to borrow book.');
    }
  };

  const handleReturnBook = async (borrowId, bookId) => {
    try {
      const returnData = {
        user_id: userId,
        book_id: bookId,
      };

      console.log('Sending return request:', returnData);

      const response = await borrowService.returnBook(returnData);
      console.log('Return response:', response.data);

      const bookToUpdate = books.find((book) => book._id === bookId);
      if (bookToUpdate) {
        await bookService.updateBook(bookId, {
          ...bookToUpdate,
          quantity: bookToUpdate.quantity + 1,
        });

        setBooks(
          books.map((book) =>
            book._id === bookId
              ? { ...book, quantity: book.quantity + 1 }
              : book
          )
        );
      }

      setSuccessMessage('Book returned successfully!');
      setMessage('');
      handleSearchBorrowedBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      setMessage('Failed to return book.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <BookForm
        form={form}
        setForm={setForm}
        selectedBook={selectedBook}
        handleAddOrEditBook={handleAddOrEditBook}
        cancelEdit={() => setSelectedBook(null)}
      />

      <SearchBooks_admin
        handleSelectBook={handleSelectBook}
        handleDeleteBook={handleDeleteBook}
      />


      <BookList_admin
        books={books}
        handleSelectBook={handleSelectBook}
        handleDeleteBook={handleDeleteBook}
      />

      <ReservationManager
        userId={userId}
        setUserId={setUserId}
        reservations={reservations}
        handleSearchReservations={handleSearchReservations}
        handleBorrowBook={handleBorrowBook}
      />

      <BorrowedBooksManager
        userId={userId}
        setUserId={setUserId}
        borrowedBooks={borrowedBooks}
        handleSearchBorrowedBooks={handleSearchBorrowedBooks}
        handleReturnBook={handleReturnBook}
      />
    </div>
  );
};
export default AdminDashboard;