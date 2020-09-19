const express = require('express');
const router = express.Router({
    mergeParams: true
});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// ADD NEW COMMENT FORM
router.get('/new', middleware.isLoggedIn, (req, res) => {
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
router.post('/', middleware.isLoggedIn, (req, res) => {
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

module.exports = router;