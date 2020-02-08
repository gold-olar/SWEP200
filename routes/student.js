const { Router } = require('express');
const StudentController = require('../controllers/student.ctrl');
const gravatar = require('gravatar');
// const store = require('store');
// const user = store.get('user');
const Post = require('../models/Post');


let image;
image = gravatar.url("sam99kupo@gmail.com");

const router = Router();

router.get('/', (req, res) => {
    res.render('student', {
        title: 'Student'
    });
});

router.get('/signup', (req, res) => {
    res.render('studentSignup', {
        title: 'Student || Sign Up'
    })
})

router.get('/login', (req, res) => {
    res.render('studentsLogin', {
        title: 'Student || Login'
    });
})

router.get('/dashboard', async (req, res) => {
  const {user} = req.cookies;
  console.log(user)
  let posts = await Post.find({level: user.level});

    res.render('studentDashboard', {
      title: ' iLearn || Dashboard',
      image: gravatar.url(user.email),
      username: user.username,
      posts,
    });
});
router.get("/chat-signup", (req, res)=>{
    res.render("chatSignup",{
        title: "iLearn || cSignup"
    })
  })

router.post('/signup',  StudentController.create );
router.post('/login',  StudentController.login );
router.get('/logout',  StudentController.logout );


module.exports = router;
