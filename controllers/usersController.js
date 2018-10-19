// REQUIRE NODE MODS

const express = require('express');

// REQUIRE MODELS

const User = require('../models/userModel')
const Barber = require('../models/barberModel')

// EXPRESS ROUTER METHOD

const router  = express.Router();

// INDEX ROUTE
router.get("/", async (req, res, next) => {
    try{
        const foundUsers = await User.find({});
            res.render("users/index.ejs", {
                users:foundUsers
            })
    } catch(err) {
        next(err)
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


