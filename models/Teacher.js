const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const teacherSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    }]
});


teacherSchema.pre('save', function (next) {
    let teacher = this;
    bcrypt.hash(teacher.password, 10, (err, hash) => {
        if (err)
            return err;

        teacher.password = hash;
        next();
    });
});

const teacherModel = mongoose.model('Teacher', teacherSchema);

module.exports = teacherModel;
