const mongoose = require('mongoose');
const { Schema } = mongoose;


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
    },

    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});



const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
