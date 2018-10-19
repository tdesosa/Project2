// REQUIRE MONGOOSE

const mongoose = require('mongoose');

// BARBER SCHEMA

const barberSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    email: String,
    phoneNumber: String,
    city: String,
    seatStaus: Boolean,
    // users:
});

// EXPORT BARBER SCHEMA

const Barber = mongoose.model('Barbers', barberSchema);
module.exports = Barber;
