const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// SHOW CAMPGROUNDS
router.get('/', (req, res) => {
    Campground.find(function (err, campgrounds) {
        if (err) {
            console.log(err.message);
        } else {
            res.render('campgrounds/index', {
                title: 'Campgrounds',
                campgrounds: campgrounds
            });
        }
    })
});

// NEW CAMPGROUND FORM
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new', {
        title: 'New Campground'
    });
});

// SHOW PARTICULAR CAMPGROUND
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Campground.findById(id).populate('comments').exec(function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/show', {
                title: campground.name,
                campground: campground
            });
        }
    })
});


// CREATE NEW CAMPGROUND (POST)
router.post('/', isLoggedIn, function (req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;

    // ADD NEW CAMPGROUND TO DATABASE
    Campground.create({
        name: name,
        image: image,
        description: description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    }, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds/new');
            console.log("Failed to add new campground. Please try again!");
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// CHECK IF LOGGED IN (MIDDLEWARE)
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;