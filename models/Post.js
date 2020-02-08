const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Comment = require('./Comment');


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
    // comment: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }
    // ],
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
