const { Router } = require('express');
const StudentController = require('../controllers/student.ctrl');
const gravatar = require('gravatar');
const Post = require('../models/Post');
const Material = require('../models/Material');
const path = require('path');


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
  let posts = await Post.find({level: user.level});

res.render('studentDashboard', {
      title: ' iLearn || Dashboard',
      image: gravatar.url(user.email),
      username: user.username,
      posts,
    });
});
router.get('/dashboard/profile', async (req, res) => {
  const {user} = req.cookies;
  res.render('studentProfile', {
        title: ' iLearn || Profile',
        image: gravatar.url(user.email),
        username: user.username,
        email: user.email,
        level: user.level,
      });
});

router.get("/dashboard/download/materials", async (req, res)=>{
      const {user} = req.cookies;
      const materials = await Material.find({level: user.level});
      res.render("allMaterials",{
          title: "iLearn || Materials",
          materials,
          image: gravatar.url(user.email),
          username: user.username,
          email: user.email,
          level: user.level,
      })
    })

router.get('/download/uploads/:file', async(req, res) => {
    const {file} = req.params;
    const path = require('path');
    res.sendFile(path.join(__dirname, '../uploads', file));
})


router.post('/signup',  StudentController.create );
router.post('/login',  StudentController.login );
router.get('/logout',  StudentController.logout );


module.exports = router;
