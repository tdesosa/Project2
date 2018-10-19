// REQUIRE MONGOOSE

const mongoose = require('mongoose');

// REQUIRE USER MODEL
const User = require("./userModel");

const User = require('./userModel')


// BARBER SCHEMA

const barberSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    email: String,
    phoneNumber: String,
    city: String,
    seatStaus: Boolean,
    // users: {type: mongoose.Schema.Types.ObjectId, required: "User"}

});

// EXPORT BARBER SCHEMA

const Barber = mongoose.model('Barbers', barberSchema);
module.exports = Barber;
