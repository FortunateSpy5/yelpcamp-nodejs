const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('landing', {
        title: "YelpCamp"
    });
});

app.get('/campgrounds', (req, res) => {
    let campgrounds = [
        {
            name: "Salmon Creek",
            image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
            name: "Granite Hill",
            image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=959&q=80"
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
    ]
    res.render('campgrounds', {
        title: "Campgrounds",
        campgrounds: campgrounds
    });
});


app.listen(port, () => console.log(`YelpCamp listening on port ${port}!`));