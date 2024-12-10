// /backend/server.js
// This file is the entry point for the backend server.

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 

//Routers Here
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/BookRoutes');
const borrowRoutes = require('./routes/BorrowRoutes');
const reservationTableRoutes = require('./routes/ReservationTableRoutes');

const app = express();
app.use(express.json());

// Cross-origin resource sharing (CORS)
// This is used to allow cross-origin requests from the frontend to the backend server.
const allowedOrigins = ['http://localhost:3001', 'https://group2library.netlify.app/'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request if origin is in the allowed list
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request otherwise
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}));

// Connect to MongoDB
const MongoDB_URI = 'mongodb+srv://group2:group2@cluster0.obuw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Library Web App by Group 2');
});

// Use routers
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/borrows', borrowRoutes); 
app.use('/api/reservations', reservationTableRoutes);

// Start server
app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});
