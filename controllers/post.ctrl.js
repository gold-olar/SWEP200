
const Post = require('../models/Post');
const store = require('store');


const create = async (req, res) => {
    const user = store.get('user');
    try {
        const { title, body, level,} = req.body;
        if (!title || !body) {
            res.render('lecturerCreatePost', {
                message: 'Please fill in all fields.'
            })
        }


        const postParams = { title, body, level, };
        const newPost = new Post(postParams);
        let savedPost = await newPost.save();


        res.render('lecturerDashboard', {
            email, password,
            message: "Post Created Successfully !!"
        })
    } catch (error) {
        return res.render('error', {
            message: 'Post Creation Failed.'
        })
    }
}



module.exports = {
    create,

}