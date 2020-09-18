const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database!'))
    .catch(error => console.log(error.message));

const Campground = require('./models/campground');
const Comment = require('./models/comment');

const seeds = [{
        name: "Mountain Camp",
        image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt et aut perferendis ullam perspiciatis aperiam facilis obcaecati, doloribus, consectetur dicta ab quam optio ut, distinctio totam rem expedita aspernatur architecto!"
    },
    {
        name: "Lake Camp",
        image: "https://images.pexels.com/photos/2419278/pexels-photo-2419278.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt et aut perferendis ullam perspiciatis aperiam facilis obcaecati, doloribus, consectetur dicta ab quam optio ut, distinctio totam rem expedita aspernatur architecto!"
    },
    {
        name: "River Camp",
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt et aut perferendis ullam perspiciatis aperiam facilis obcaecati, doloribus, consectetur dicta ab quam optio ut, distinctio totam rem expedita aspernatur architecto!"
    }
]





async function seedDB() {
    await Campground.deleteMany({}).exec()
        .catch(err => console.log(err.message))
        .then(() => console.log('removed'));

    seeds.forEach((seed) => {
        Campground.create(seed)
            .catch(err => console.log(err.message))
            .then((campground) => {
                Comment.create({
                        text: "Great view but I wish there was internet!",
                        author: "Arthur Morgan"
                    })
                    .catch(err => console.log(err.message))
                    .then((comment) => {
                        campground.comments.push(comment);
                        campground.save();
                    })
            })
    });
    console.log('Done')
}

seedDB();