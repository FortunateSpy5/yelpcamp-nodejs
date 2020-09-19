const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

// SHOW CAMPGROUNDS
router.get('/', (req, res) => {
    Campground.find(function (err, campgrounds) {
        if (err) {
            console.log(err.message);
            res.redirect('back');
        } else {
            res.render('campgrounds/index', {
                title: 'Campgrounds',
                campgrounds: campgrounds
            });
        }
    })
});

// NEW CAMPGROUND FORM
router.get('/new', middleware.isLoggedIn, (req, res) => {
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
router.post('/', middleware.isLoggedIn, function (req, res) {
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

// EDIT CAMPGROUND FORM
router.get('/:id/edit', middleware.isLoggedIn, middleware.checkOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {
                title: 'Edit ' + campground.name,
                campground: campground
            });
        }
    })
});

// UPDATE CAMPGROUND
router.put('/:id', middleware.isLoggedIn, middleware.checkOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, campground) => {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
})

// DESTROY CAMPGROUND
router.delete('/:id', middleware.isLoggedIn, middleware.checkOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    })
})

module.exports = router;