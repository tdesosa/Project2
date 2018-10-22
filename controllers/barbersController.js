// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const Barber = require('../models/barberModel')
const User = require('../models/userModel')

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

router.get('/new', async (req, res, next) => {
    // const foundUser = await User.find({});
    res.render('barbers/new.ejs', {
        // user: foundUser
    });
});

// SHOW ROUTE

router.get('/:id', async (req, res, next) => {
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
        // const newUser = await User.findById(req.body.userId)
        const newBarber = await Barber.create(req.body);
        // newUser.barbers.push(newBarber);
        await newBarber.save();
        
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


// router.put('/:id', async (req, res) => {
//     try {
//         const newUser = await User.findOne({'_id': req.body.userId});
//         const barber = await Barber.findById(req.params.id);
//         const oldUser = await User.findOne({'barbers._id': barbers._id})
//         await Barber.findByIdAndUpdate(req.params.id, req.body);
//         for (let i = 0; i < oldUser.barbers.length; i++){
//             if (`${oldUser.barbers[i]._id}` === `${barbers._id}`){
//                 await oldUser.barbers.splice(i, 1);
//             }
//         }
//         newUser.barbers.push(barber);
//         await newUser.save();
//         await oldUser.save();
//         res.redirect(`/barbers/${req.params.id}`)
//     } catch (err){
//         res.send(err);
//     }
// });

// DELETE ROUTE

router.delete('/:id', async (req, res, next) => {
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