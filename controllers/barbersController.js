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

router.get('/new', (req, res, next) => {
    res.render('barbers/new.ejs', {
    });
});

// SHOW ROUTE

router.get('/:id', async (req, res, next) => {
    try {
        const foundBarber = await Barber.findById(req.params.id);

        res.render('barbers/show.ejs', {
            barber: foundBarber
        });
    } catch (err) {
        next(err);
    }
});

// EDIT ROUTE

router.get('/:id/edit', async (req, res, nex) => {
    try {
        const foundBarber = await Barber.findById(req.params.id);

        res.render('barbers/edit.ejs', {
            barber: foundBarber
        });
    } catch (err) {
        next(err);
    }
});

// CREATE ROUTE

router.post('/', async (req, res, next) => {
    try {
        const newBarber = await Barber.crete(req.body);

        res.redirect('/barbers');
    } catch (err) {
        next(err);
    }
});

// UPDATE ROUTE

router.put('/:id', async (req, res, next) => {
    try {
        const newBarber = await Barber.findByIdAndUpdate(req.params.id, req.body);

        res.redirect(`/barbers/${req.params.id}`);
    } catch (err) {
        next(err);
    }
});

// DELETE ROUTE

router.delete('/:id', async (req, res, next) => {
    try {
        const deletedBarber = await Barber.findByIdAndDelete(req.params.id);

        res.redirect('/barbers');
    } catch (err) {
        next(err);
    }
});

// EXPORT ROUTER

module.exports = router;