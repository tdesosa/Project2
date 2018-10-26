// REQUIRE MONGOOSE

const mongoose = require('mongoose');

// SET CONNECTION STRING & NAME DB IN MONGO

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/barbersapp';

// CONNECTTION TO MONGO VIA MONGOOSE

mongoose.connect(connectionString, {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log(`MONGOOSE CONNECTED AT ${connectionString}`);
});

mongoose.connection.on('disconnected', () => {
    console.log(`MONGOOSE DISCONNECTED`);
});

mongoose.connection.on('error', (err) => {
    console.log(`MONGOOSE ERROR`, err);
});