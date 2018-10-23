// REQUIRE NODE MODS

const express = require('express');
const bcrypt  = require('bcryptjs');

// REQUIRE MODELS

const User = require('../models/userModel');

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INFORMATION THAT SESSION SAVES
router.get('/', (req, res) => {
    req.session.username = 'username'
    req.session.password = 'password'
});

// ROUTE LEADING FROM HOME PAGE TO REGISTER PAGE
router.get("/register", (req, res) => {
    res.render("register.ejs")
})

// REGISTER ROUTE
router.post('/register', (req, res, next) => {
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(12));
    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;
    User.create(userDbEntry, (err, user) => {
        console.log(user);
        req.session.userId = user.userId;
        req.session.logged   = true;
        res.redirect('/')
  });
});


// LOGIN ROUTE
router.post('/login', async (req, res, next) => {
    try{
        console.log(req.body)
        await User.findOne({username: req.body.username}, (err, user) => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.message  = 'Successfully logged in!';
                req.session.userId = user._id;
                req.session.logged   = true;
                console.log(req.session, req.body)
                res.redirect('/')
            } else {
                req.session.message = 'Username or password are incorrect';
                res.redirect('/')
            }
        } else {
            req.session.message = 'Username or password are incorrect';
            res.redirect('/')
        }
    });
    } catch(err){
        next(err);
    }
});

// LOGOUT ROUTE
router.get('/logout', (req, res, next) => {
    if (req.session) {
      // delete session object
      req.session.destroy((err) => {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
});

// EXPORT ROUTER

module.exports = router;
