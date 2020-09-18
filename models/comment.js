const mongoose = require('mongoose');

// COMMENT SCHEMA
const commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

// EXPORT MODEL
module.exports = mongoose.model('Comment', commentSchema);