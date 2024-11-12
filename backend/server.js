// file name: server.js
const mongoose = require('mongoose');
const express = require('express');

const app = express();


const MongoDB_URI = 'mongodb+srv://group2:group2@cluster0.obuw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Library Web App by Group 2');
});

app.listen(3000, () => {
    console.log(`Server listening on port 3000`);
});