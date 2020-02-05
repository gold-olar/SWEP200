const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');


const studentSchema = new Schema({
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
    level:{
        type: Number,
        required: true
    },
});


studentSchema.pre('save', function (next) {
    let student = this;
    bcrypt.hash(student.password, 10, (err, hash) => {
        if (err)
            return err;

        student.password = hash;
        next();
    });
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;
