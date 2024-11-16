// file name: server.js
const mongoose = require('mongoose');
const express = require('express');

//Routers Here
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/BookRoutes');
const borrowRoutes = require('./routes/BorrowRoutes');

const app = express();
app.use(express.json());


const MongoDB_URI = 'mongodb+srv://group2:group2@cluster0.obuw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Library Web App by Group 2');
});

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); 
app.use('/api/borrows', borrowRoutes); 

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});