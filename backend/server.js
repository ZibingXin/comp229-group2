// /backend/server.js
// This file is the entry point for the backend server.
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 
const Book = require('./models/Book');

//Routers Here
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/BookRoutes');
const borrowRoutes = require('./routes/BorrowRoutes');
const reservationTableRoutes = require('./routes/ReservationTableRoutes');

const app = express();
app.use(express.json());

// Cross-origin resource sharing (CORS)
// This is used to allow cross-origin requests from the frontend to the backend server.
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002'];

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

mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000,
    socketTimeoutMS: 60000
})
.then(() => {
    console.log('MongoDB connection successful');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

/*
const MongoDB_URI = 'mongodb+srv://group2:group2@cluster0.obuw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false,serverSelectionTimeoutMS: 30000,socketTimeoutMS: 30000  })
   .then(() => {
    console.log('Connected to MongoDB');
    })
   .catch(err => console.log(err));


*/
   mongoose.connection.once('open', async () => {
    try {
        // Use the Book model directly here, as you've already imported it
        const books = await Book.find().limit(1);
        console.log('Fetched books:', books);
    } catch (err) {
        console.log('Error fetching books:', err);
    }
});


app.get('/', (req, res) => {
    res.send('Library Web App by Group 2');
});

app.get('/test-books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Test Book.find() error', error: err });
    }
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
