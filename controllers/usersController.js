// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const User = require('../models/userModel')
const Barber = require('../models/barberModel')
const requireLogin = require("../middleware/requireLogin")

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INDEX ROUTE

router.get('/', requireLogin, async (req, res, next) => {
    try{
        const foundUsers = await User.find({});
        const foundBarbers = await Barber.find({});

        res.render("users/index.ejs", {
            users: foundUsers,
            barbers: foundBarbers
        });
    }catch (err) {
        next(err)
    }
});


// NEW ROUTE

router.get('/new', requireLogin, async (req, res, next)=>{
    try{
        const foundBarber = await Barber.find({});
        res.render('users/new.ejs', {
            barber: foundBarber
        });
    } catch(err){
        next(err)
    }
});

// SHOW ROUTE

router.get('/:id', requireLogin, async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const foundBarber = await Barber.find();
        console.log(foundBarber);
        // const foundBarber = await Barber.findById(req.body.barberId);
        // const foundBarber = await Barber.findOne({"barbers._id": req.params.id});
        // console.log(foundBarber);
        res.render("users/show.ejs", {
            user: foundUser,
            barber: foundBarber
        });
    } catch (err) {
        next(err);
    }
});

// EDIT ROUTE

router.get('/:id/edit', requireLogin, async (req, res, next) => {
    try {
        const foundUser = await User.findById(req.params.id);
        const allBarbers = await Barber.find({});
        // const foundBarber = await Barber.findById(req.params.id);
        // console.log(foundBarber);
        await foundUser.save();
        res.render('users/edit.ejs', {
            user: foundUser,
            barber: allBarbers
        });
    } catch (err) {
        next(err);
    }
});

// CREATE ROUTE

router.post('/', requireLogin, async (req, res, next) => {
    try {
        const newBarber = await Barber.findById(req.body.barberId)
        const newUser = await User.create(req.body);
        newUser.barbers.push(newBarber);
        await newUser.save();

        res.redirect('/users');
    } catch (err) {
        next(err);
    }
});

// UPDATE ROUTE

router.put('/:id', requireLogin, async (req, res, next) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.params.id, req.body);
        const foundBarber = await Barber.findById(req.body.barberId);
        newUser.barbers.push(foundBarber);
        await newUser.save();
        res.redirect(`/users/${req.params.id}`);
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

router.delete('/:id', requireLogin, async (req, res) => {
    try {
        // const foundUser = User.findOne({"barbers._id": req.params.id});
        // const foundBarber = await Barber.findById(req.params.id);
        // user.barbers.id(req.params.id).remove();
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        // await foundUser.save();

        res.redirect('/users');
    } catch (err) {
        next (err);
    }
});

// EXPORT ROUTER

module.exports = router;


