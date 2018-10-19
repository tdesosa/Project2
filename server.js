// REQUIRE NODE MODS

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-sesssion');
// const bcrypt         = require('bcryptjs');

// REQUIRE ACCESS TO MONGO VIA MONGOOSSE

require('./db/db');

// REQUIRE CONTROLLERS

// const authController  = require('./controllers/authController');
const usersController  = require('./controllers/usersController');
// const barbersController = require('./controllers/barbersController');

// MIDDLEWARE SETUP

// app.use(session({
//     secret: 'Secret String',
//     resave: false,
//     saveUninitialized: false
// }));

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(methodOverride('_method'));

// app.use('/auth', authController);
app.use('/users', usersController);
// app.use('/barbers', barbersController);

// LANDING PAGE

app.get('/', (req, res) => {
    res.render('landing.ejs');
});

// SET PORT VARIABLE

const port = 3000;

// SERVER CONNECTION

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${port}`);
});
