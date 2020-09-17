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
    image: String,
    description: String
});

// CAMPGROUND MODEL
const Campground = mongoose.model('Campground', campgroundSchema);

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
    // GET ALL CAMPGROUNDS
    Campground.find(function (err, campgrounds) {
        if (err) {
            console.log(err.message);
        } else {
            res.render('index', {
                title: 'Campgrounds',
                campgrounds: campgrounds
            });
        }
    })
});



// NEW CAMPGROUNDS PAGE
app.get('/campgrounds/new', (req, res) => {
    res.render('new', {
        title: 'New Campground'
    });
});



app.get('/campgrounds/:id', (req, res) => {
    const id = req.params.id;
    Campground.findById(id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            res.render('show', {
                title: campground.name,
                campground: campground
            });
        }
    })
});



// CREATE CAMPGROUND (POST)
app.post('/campgrounds', function (req, res) {
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    
    // ADD NEW CAMPGROUND TO DATABASE
    Campground.create({
        name: name,
        image: image,
        description: description
    }, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds/new');
            console.log("Failed to add new campground. Please try again!");
        } else {
            console.log('Campground added to Database!');
            console.log(campground);
            res.redirect('/campgrounds');
        }
    });
})

// LISTEN
app.listen(port, () => console.log(`YelpCamp listening on port ${port}!`));