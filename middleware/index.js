const middlewareObj = {}
const Campground = require('../models/campground');

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Please login before proceeding.')
        res.redirect('/login');
    }
}

middlewareObj.checkOwnership = (req, res, next) => {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            req.flash('error', 'Something went wrong! Please try again.');
            res.redirect('/campgrounds');
        } else {
            if (campground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash('error', 'You are not authorized to access the page!');
                res.redirect('/campgrounds');
            }
        }
    })
}

module.exports = middlewareObj;