const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// LANDING PAGE
router.get('/', (req, res) => {
    res.render('landing', {
        title: 'YelpCamp'
    });
});

// SIGN UP FORM
router.get('/register', (req, res) => {
    res.render('auth/register', {
        title: 'Register'
    });
});

// SIGN UP POST
router.post('/register', (req, res) => {
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message)
            res.redirect('/register');
        } else {
                passport.authenticate('local')(req, res, () => {
                    req.flash('success', 'Welcome to YelpCamp, ' + user.username);
                    res.redirect('/campgrounds');
            });
        }
    })
});

// LOGIN FORM
router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login'
    });
});

// LOGIN POST
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {
    res.redirect('/');
});

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;