module.exports = function(req, res, next) {
    if(!req.session.userId){
        console.log("You need to be logged in")
        req.session.message = "You need to be logged in";
        res.redirect("/");
    } else {
        next();
    }
}

