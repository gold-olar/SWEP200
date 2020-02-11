const mongoose = require('mongoose');
const { Schema } = mongoose;
// const Comment = require('./Comment');


const materialSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    owner : {
      type: String,
    },

    date: {
        type: Date,
        default: Date.now()
    }
});



const materialModel = mongoose.model('Material', materialSchema);

module.exports = materialModel;
