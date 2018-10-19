// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const User = require('../models/userModel')
const Barber = require('../models/barberModel')

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INDEX ROUTE
router.get('/', async (req, res, next) => {
    try{
        const foundUsers = await User.find();

        res.render("users/index.ejs", {
            users: foundUsers
        });
    }catch (err) {
        next(err)
    }
});

// NEW ROUTE
router.get('/new', (req, res, next)=>{
    res.render('users/new.ejs');
});

// SHOW ROUTE
router.get('/:id', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.render("users/show.ejs", {
            user: foundUser
        });
    } catch (err) {
        next(err);
    }
});

// EDIT ROUTE
router.get('/:id/edit', async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        res.render('users/edit.ejs', {
            user: foundUser
        });
    } catch (err) {
        next(err);
    }
});

// CREATE ROUTE
router.post('/', async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        
        res.redirect('/users');
    } catch (err) {
        next(err);
    }
});

// UPDATE ROUTE
router.put('/:id', async (req, res, next) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/users/${req.params.id}`);
    } catch (err) {
        next(err);
    }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.redirect('/users');
    } catch (err) {
        next (err);
    }
});

// EXPORT ROUTER

module.exports = router;


