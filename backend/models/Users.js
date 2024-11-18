// /backend/models/Users.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {type: String,required: true,unique: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    role: {type: String,required: true, enum: ['admin', 'user'], default: 'user'}
}, {timestamps: true});

// Create the User model
module.exports = mongoose.model('User', userSchema);
