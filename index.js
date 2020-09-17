const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// MONGOOSE CONNECT
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database!'))
    .catch(error => console.log(error.message));

// CAMPGROUND SCHEMA
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

// CAMPGROUND MODEL
const Camground = mongoose.model('Campground', campgroundSchema);

// CREATE
// Camground.create({
//     name: 'Mountain Goat\'s Rest',
//     image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
// }, function (err, campground) {
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log('Campground Created!');
//         console.log(campground);
//     }
// });

// BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true
}));

// SET EJS AS DEFAULT
app.set('view engine', 'ejs');

// LANDING PAGE
app.get('/', (req, res) => {
    res.render('landing', {
        title: 'YelpCamp'
    });
});

//CAMPGROUNDS PAGE
app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {
        title: 'Campgrounds',
        campgrounds: campgrounds
    });
});

// NEW CAMPGROUNDS PAGE
app.get('/campgrounds/new', (req, res) => {
    res.render('new', {
        title: 'New Campground'
    });
});

// CREATE CAMPGROUND (POST)
app.post('/campgrounds', function (req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {
        name: name,
        image: image
    }
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
})

// LISTEN
app.listen(port, () => console.log(`YelpCamp listening on port ${port}!`));