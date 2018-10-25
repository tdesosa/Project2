// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const Barber = require('../models/barberModel')
const User = require('../models/userModel')
const requireLogin = require("../middleware/requireLogin")

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INDEX ROUTE

router.get('/', requireLogin, async (req, res, next) => {
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

router.get('/new', requireLogin, async (req, res, next) => {
    try{
        // //console.log(req.body);
        // let seatStatus;
        // if(req.body.seatStatus == "on"){
        //     seatStatus = true;
        // }else{
        //     seatStatus = false;
        // }
        //     dbQuery = {
        //     seatStatus: seatStatus
        // }
        // const foundUser = await User.find({});
        res.render('barbers/new.ejs', {
        //user: foundUser
    });
    } catch(err){
        next(err)
    }
});

// SHOW ROUTE

router.get('/:id', requireLogin, async (req, res, next) => {
    try {
        const foundBarber = await Barber.findById(req.params.id);
        // const foundUser = await User.findOne({"barbers._id": req.params.id});

        res.render('barbers/show.ejs', {
            barber: foundBarber,
            // user: foundUser
        });
    } catch (err) {
        next(err);
    }
});

// EDIT ROUTE

router.get('/:id/edit', requireLogin, async (req, res, nex) => {
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

router.post('/', requireLogin, async (req, res, next) => {
    try {
        console.log(req.body);
        let seatStatus;
        if(req.body.seatStatus == "on"){
            seatStatus = true;
        }else{
            seatStatus = false;
        }
            dbQuery = {
            seatStatus: seatStatus
        }
        
        // const newUser = await User.findById(req.session.userId)
        const newBarber = await Barber.create(req.body);
        // newUser.barbers.push(newBarber);
        // await newUser.save();
        res.redirect('/barbers');
    } catch (err) {
        next(err);
    }
});

// UPDATE ROUTE

router.put('/:id', requireLogin, async (req, res, next) => {
    try {
        console.log(req.body);
        let seatStatus;
        if(req.body.seatStatus == "on"){
            seatStatus = true;
        }else{
            seatStatus = false;
        }
            dbQuery = {
            seatStatus: seatStatus
        }
        await Barber.findByIdAndUpdate(req.params.id, dbQuery);

        res.redirect(`/barbers/${req.params.id}`);
    } catch (err) {
        next(err);
    }
});

// DELETE ROUTE

router.delete('/:id', requireLogin, async (req, res, next) => {
    try {
        //const user = await User.findOne({'barbers._id': req.params.id});
        const barber = await Barber.findById(req.params.id);
        //user.barbers.id(req.params.id).remove();
        const deletedBarber = await Barber.findByIdAndDelete(req.params.id);
        // await user.save();
        res.redirect('/barbers');
    } catch (err) {
        next(err);
    }
});

// EXPORT ROUTER

module.exports = router;