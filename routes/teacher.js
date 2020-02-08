const { Router } = require('express');
const TeacherController = require('../controllers/teacher.ctrl');
const PostController = require('../controllers/post.ctrl');
const gravatar = require('gravatar');
const Post = require('../models/Post');
// const store = require('store');
// const user = store.get('user');
const bodyParser= require('body-parser')
const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


const router = Router();

//  Lecturers
router.get('/', (req, res) => {
    res.render('lecturer', {
      title: 'Teacher'
    });
  });

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
router.post('/upload', upload.single('file'), async (req, res, next) => {
  console.log("111111111111111111111111111111")
  const {user} = req.cookies;
  const file = req.file;
  const material = fs.readFileSync(req.file.path);
  const encode_material = material.toString('base64');
  console.log(encode_material)
  console.log(material)
  var final = {
      contentType: req.file.mimetype,
      material:  new Buffer(encode_material, 'base64')
   };
   console.log(final);
  // if (!file) {
  //   res.render('lecturerUpload', {
  //     title: ' iLearn || Dashboard',
  //     username: user.username,
  //     message: "Please upload a file",
  //     image: gravatar.url(user.email),
  //   })
  // }
    res.send(file);
})


router.post('/signup',  TeacherController.create );
router.post('/login',  TeacherController.login );
router.get('/logout',  TeacherController.logout );
router.post('/createPost',  PostController.create );


module.exports = router;
