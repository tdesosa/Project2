// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const Barber = require('../models/barberModel')
// const User = require('../models/userModel')

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INDEX ROUTE

router.get('/', async (req, res, next) => {
    try {
        const foundBarbers = await Barber.find({});

        res.render('barbers/index.ejs', {
            barbers: foundBarbers
        });
    } catch (err) {
        next(err);
    }
});

// NEW ROUTE

// SHOW ROUTE

// EDIT ROUTE

// CREATE ROUTE

// UPDATE ROUTE

// DELETE ROUTE

// EXPORT ROUTER

module.exports = router;