
const Teacher = require('../models/Teacher');
const Secret = process.env.SECRET;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const store = require('store');
const gravatar = require('gravatar');


const create = async (req, res) => {
    try {
        const { username, password, email,  confirmPassword } = req.body;
        if (!username || !password || !email) {
            res.render('lectureSignup', {
                message: 'Please fill in all fields.'
            })
        }
        if(password !== confirmPassword){
            res.render('lectureSignup', {
                message: `Passwords don't match`,
            })
        }

        const existingUser = await Teacher.findOne({ email });
        if (existingUser)
            return res.render('lectureSignup', { message: "User already exists with this email." })


        const userParams = { username, password, email, };
        const newTeacher = new Teacher(userParams);
        let savedUser = await newTeacher.save();


        res.render('lectureLogin', {
            email, password,
            message: "Please, login to continue."
        })
    } catch (error) {
        return res.render('error', {
            message: 'Registration has failed.'
        })
    }
}



const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Teacher.findOne({ email });
    if (!user)
        return res.render('lectureLogin', { message: 'User not found, please register' });

    await bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
            let tokenData = { userId: user._id, username: user.username }
            let token = jwt.sign(tokenData, Secret);

            // Store details in store
           res.cookie('user', user);
           res.cookie('token', token);

            res.cookie('auth', token);
            // res.render('lecturerDashboard', {
            //   title: ' iLearn || Dashboard',
            //   username: user.username,
            //   image: gravatar.url(user.email),
            // });
            res.redirect('/lecturer/dashboard');
        }
        return res.render('lectureLogin', { message: 'Wrong password.' })
    });


}


const logout = (req, res) => {
    res.cookie('auth', '');
    let token = req.cookies.auth;
    token = '';

    // Clear Store
    store.clearAll()

    return res.render('lectureLogin', {message: 'Logout Successfull'})
}

module.exports = {
    create, login, logout

}
