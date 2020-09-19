const mongoose = require('mongoose');

// COMMENT SCHEMA
const commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});

// EXPORT MODEL
module.exports = mongoose.model('Comment', commentSchema);