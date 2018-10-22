// REQUIRE MONGOOSE

const mongoose = require('mongoose');

// REQUIRE BARBER MODEL FOR TEAMS ARRAY IN USER SCHEMA

const Barber = require('./barberModel');

// USER SCHEMA

const userSchema = new mongoose.Schema({
    username: {type: String, required: true}, // may need to use unique: true here
    password: String,
    // email: String,
    // phoneNumber: String,
    // city: String,
    barbers: [Barber.schema]
});

// EXPORT USER SCHEMA

const User = mongoose.model('Users', userSchema);
module.exports = User;