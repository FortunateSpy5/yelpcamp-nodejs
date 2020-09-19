const middlewareObj = {}
const Campground = require('../models/campground');

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

middlewareObj.checkOwnership = (req, res, next) => {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('back');
        } else {
            if (campground.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect('back');
            }
        }
    })
}

module.exports = middlewareObj;