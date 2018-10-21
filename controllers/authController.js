// REQUIRE NODE MODS

const express = require('express');
const bcrypt  = require('bcryptjs');
// REQUIRE MODELS

const User = require('../models/userModel');

// EXPRESS ROUTER METHOD

const router  = express.Router();


router.get('/', (req, res) => {
    req.session.username = 'username'
    req.session.password = 'password'
});


// LOGIN ROUTE
router.post('/login', (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    req.session.logged   = true;
    console.log(req.session);
    res.redirect('/authors')
  });



// router.post('/login', async(req, res, next) => {
//     try {
//         console.log(req.body)
//         const user = await User.find({username: req.body.username});
//         const validLogin = await bcrypt.compare(req.body.password, user.password);
//         console.log(validLogin);
//         req.session.userId = user._id;
//         res.redirect('/login');
//     } catch(err) {
//         next(err)
//     }
// });

// router.post('/', async(req, res) => {
//     try{
//         if(!req.session.userId){
//             res.render('/auth/login', {
//                 message: "you must be logged in to do that"
//             })
//         } else{
//             const newReview = {
//                 title: req.body.title,
//                 body: req.body.body,
//                 // etc etc from the schema
//                 rating: req.body.rating,
//                 coffee: req.body.cofee,
//                 reviewer: req.session.userId
//             }
//         }
//     } catch(err){
//         next(err)
//     }
// });

// REGISTER ROUTE

// CREATE ROUTE

// LOGOUT ROUTE

// EXPORT ROUTER

module.exports = router;
