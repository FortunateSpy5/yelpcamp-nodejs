const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      port       = 3000,
      mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment = require('./models/comment')      


// MONGOOSE CONNECT
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database!'))
    .catch(error => console.log(error.message));

app.use(express.static("public"));

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
            res.render('campgrounds/index', {
                title: 'Campgrounds',
                campgrounds: campgrounds
            });
        }
    })
});


// NEW CAMPGROUNDS PAGE
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new', {
        title: 'New Campground'
    });
});


app.get('/campgrounds/:id', (req, res) => {
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


// ===============
// COMMENTS ROUTES
// ===============

app.get('/campgrounds/:id/comments/new', (req, res) => {
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
})

app.post('/campgrounds/:id/comments', (req, res) => {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err.message);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err.message);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})


// LISTEN
app.listen(port, () => console.log(`YelpCamp listening on port ${port}!`));