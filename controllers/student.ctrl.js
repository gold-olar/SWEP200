
const Student = require('../models/Student');
const Secret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const create = async (req, res) => {
    try {
        const { username, password, email, level, confirmPassword } = req.body;
        if (!username || !password || !email || !level) {
            res.render('create', {
                message: 'Please fill in all fields.'
            })
        }
        if(password !== confirmPassword){
            res.render('create', {
                message: `Passwords don't match`,
            })
        }

        const existingUser = await Student.findOne({ email });
        if (existingUser)
            return res.render('create', { message: "User already exists with this email." })


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
    const user = await User.findOne({ email });
    if (!user)
        return res.render('login', { message: 'User not found, please register' });

    await bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
            let tokenData = { userId: user._id, username: user.username }
            let token = jwt.sign(tokenData, Secret);
            localStorage.setItem('token', token);

            res.cookie('auth', token);
            res.redirect('dashboard');
        }
        return res.render('login', { message: 'Wrong password.' })
    });


}


const logout = (req, res) => {
    res.cookie('auth', '');
    let token = req.cookies.auth;
    token = '';
    localStorage.setItem('token', "");


    return res.render('login', {message: 'Logout Successfull'})
}

module.exports = {
    create, login, logout

}