const { Router } = require('express');
const TeacherController = require('../controllers/teacher.ctrl');
const MaterialController = require('../controllers/material.ctrl');
const PostController = require('../controllers/post.ctrl');
const gravatar = require('gravatar');
const Post = require('../models/Post');
const bodyParser= require('body-parser')
const multer=require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

// default options



const router = Router();

//  Lecturers
router.get('/', (req, res) => {
    res.render('lecturer', {
      title: 'Teacher'
    });
  });

router.get('/profile', (req, res) => {
  const {user} = req.cookies;

  res.render('lecturerProfile', {
    title: "Lecturer's || Edit Profile",
    username: user.username,
    image: gravatar.url(user.email),
    email: user.email,
  })
})

router.get('/forum', (req, res) => {
  const {user} = req.cookies;

  res.render('chat', {
    title: "Lecturer's || Edit Profile",
    username: user.username,
    image: gravatar.url(user.email),
    email: user.email,
  })
})

router.get('/login', (req, res) => {
    res.render('lectureLogin', {
      title: "Lecturer's || Login",
    })
  })
  router.get('/signup', (req, res) => {
    res.render('lectureSignup', {
      title: "Lecturer's || Sign Up",
    })
  })


  router.get('/dashboard', async (req, res) => {
    const {user} = req.cookies;
    res.render('lecturerDashboard', {
      title: ' iLearn || Dashboard',
      username: user.username,
      image: gravatar.url(user.email),
    });
});

router.get('/dashboard/posts', async (req, res) => {
  const {user} = req.cookies;
  const posts =  await Post.find({author: user.username});

  res.render('lecturerDashboardPosts', {
    title: ' iLearn || Dashboard',
    username: user.username,
    image: gravatar.url(user.email),
    posts: posts,
  });
});

router.get('/dashboard/post/materials',  (req, res) => {
  const {user} = req.cookies;
  res.render('lecturerUpload', {
    title: ' iLearn || Dashboard',
    username: user.username,
    image: gravatar.url(user.email),
});

})
router.post('/upload', upload.any(), MaterialController.upload )


router.post('/signup',  TeacherController.create );
router.post('/login',  TeacherController.login );
router.get('/logout',  TeacherController.logout );
router.post('/createPost',  PostController.create );


module.exports = router;
