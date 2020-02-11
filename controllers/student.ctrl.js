
const Student = require('../models/Student');
const Secret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('store');



const create = async (req, res) => {
    try {
        const { username, password, email, level, confirmPassword } = req.body;
        if (!username || !password || !email || !level) {
            res.render("studentSignup", {
                message: 'Please fill in all fields.'
            })
        }
        if(password !== confirmPassword){
            res.render("studentSignup", {
                message: `Passwords don't match`,
            })
        }

        const existingUser = await Student.findOne({ email });
        if (existingUser)
            return res.render("studentSignup", { message: "User already exists with this email." })


        const userParams = { username, password, email, level };
        const newStudent = new Student(userParams);
        let savedUser = await newStudent.save();


        res.render('studentsLogin', {
            email, password,
        })
    } catch (error) {
        return res.render('error', {
            message: 'Registration has failed.'
        })
    }
}



const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });
    if (!user)
        return res.render('studentsLogin', { message: 'User not found, please register' });

    await bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
            let tokenData = { userId: user._id, username: user.username }
            let token = jwt.sign(tokenData, Secret);


            // store user details
            res.cookie('user', user);
            res.cookie('token', token);

            res.cookie('auth', token);
            res.redirect('/student/dashboard');
        }
        return res.render('studentsLogin', { message: 'Wrong password.' })
    });


}


const logout = (req, res) => {
    res.cookie('auth', '');
    let token = req.cookies.auth;
    token = '';


    return res.render('studentsLogin', {message: 'Logout Successfull'})
}

module.exports = {
    create, login, logout

}
