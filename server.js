// REQUIRE NODE MODS

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const session        = require('express-session');
const bcrypt         = require('bcryptjs');

// REQUIRE ACCESS TO MONGO VIA MONGOOSSE

require('./db/db');

// REQUIRE CONTROLLERS

const authController    = require('./controllers/authController');
const usersController   = require('./controllers/usersController');
const barbersController = require('./controllers/barbersController');

// MIDDLEWARE SETUP

app.use(express.static('public'));

app.use(session({
    secret: "Secret String",
    resave: false,
    saveUninitialized: false
   
}));
app.use((req, res, next) => {
    if(req.session.message){
        res.locals.message = req.session.message;
        delete req.session.message;
    }
    next();
});
app.use(async(req, res, next) => {
    res.locals.user = req.session.user || {};
    next()
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.use('/auth', authController);
app.use('/users', usersController);
app.use('/barbers', barbersController);


// LOGIN & LANDING PAGE

app.get('/', async (req, res, next) => {
    try{
        if(!req.session.userId){
            res.render('login.ejs');
    } else {
        res.render('landing.ejs');
    }
    } catch(err){
        next(err)
    }
});

// SET PORT VARIABLE

const port = process.env.PORT || 3000;

// SERVER CONNECTION

app.listen(port, () => {
    console.log(`SERVER IS LISTENING ON PORT: ${port}`);
});
