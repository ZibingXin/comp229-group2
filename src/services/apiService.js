import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (loginData) => apiClient.post('/auth/login', loginData),
  logout: () => apiClient.post('/auth/logout'),
};

export const bookService = {
  getBooks: () => apiClient.get('/books'),
  getBookById: (id) => apiClient.get(`/books/${id}`),
  addBook: (bookData) => apiClient.post('/books', bookData),
  updateBook: (id, bookData) => apiClient.put(`/books/${id}`, bookData),
  deleteBook: (id) => apiClient.delete(`/books/${id}`),
  searchBooks: (query) => apiClient.get(`/books/search?q=${query}`),
};

export const borrowService = {
  borrowBook: (borrowData) => apiClient.post('/borrows', borrowData),
  getUserBorrowRecords: (userId) => apiClient.get(`/borrows/user/${userId}`),
  returnBook: (returnData) => apiClient.put('/borrows/return', returnData),
};

export const reservationService = {
  reserveBook: (reservationData) => apiClient.post('/reservations', reservationData),
  cancelReservation: (id) => apiClient.put(`/reservations/${id}/cancel`),
  getReservationById: (id) => apiClient.get(`/reservations/${id}`),
  getAllReservations: () => apiClient.get('/reservations'),
  getUserReservations: (userId) => apiClient.get(`/reservations/user/${userId}`),
  finishReservation: (id) => apiClient.put(`/reservations/${id}/finish`),
};

export const contactService = {
  submitContactForm: (contactData) => apiClient.post('/contact/submit', contactData),
  getAllContacts: () => apiClient.get('/contact/getall'),
};


export default apiClient;
