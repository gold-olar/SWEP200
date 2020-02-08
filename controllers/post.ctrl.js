
const Post = require('../models/Post');
// const store = require('store');
const gravatar = require('gravatar');



const create = async (req, res) => {
    // const user = await store.get('user');
    const {user} = req.cookies;
    try {
        const { title, body, level,} = req.body;
        if (!title || !body) {
            res.render('lecturerDashboard', {
                message: 'Please fill in all fields.'
            })
        }


        const postParams = { title, body, level, author:user.username, };
        const newPost = new Post(postParams);
        let savedPost = await newPost.save();


        res.render('lecturerDashboard', {
            message: "Post Created Successfully !!",
            username: user.username,
            image: gravatar.url(user.email),
        })
    } catch (error) {
        return res.render('error', {
            message: error.message,

        })
    }
}



module.exports = {
    create,

}
