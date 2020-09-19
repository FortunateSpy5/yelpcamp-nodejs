const mongoose = require('mongoose');

// CAMPGROUND SCHEMA
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

// EXPORT MODEL
module.exports = mongoose.model('Campground', campgroundSchema);