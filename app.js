const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes = require('./routes/comments'),
    indexRoutes = require('./routes/index')

// MONGOOSE CONNECT
mongoose.connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to database!'))
    .catch(error => console.log(error.message));

// USE STATIC FILES
app.use(express.static("public"));

// BODYPARSER
app.use(bodyParser.urlencoded({
    extended: true
}));

// SET EJS AS DEFAULT
app.set('view engine', 'ejs');

// METHOD OVERRIDE
app.use(methodOverride('_method'));

// FLASH
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "When I find myself in times of trouble",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE TO ADD USER DETAILS TO VARIABLE
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// ROUTES
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// LISTEN
app.listen(port, () => console.log(`YelpCamp listening on port ${port}!`));