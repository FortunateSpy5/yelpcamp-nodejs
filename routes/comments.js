const express = require('express');
const router = express.Router({
    mergeParams: true
});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

// ADD NEW COMMENT FORM
router.get('/new', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.render('comments/new', {
                title: "New Comment",
                campground: campground
            });
        }
    })
});

// NEW COMMENT POST
router.post('/', isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err.message);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

// CHECK IF LOGGED IN (MIDDLEWARE)
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;