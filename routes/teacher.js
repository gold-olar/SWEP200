const { Router } = require('express');
const TeacherController = require('../controllers/teacher.ctrl');

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
  
  router.get('/dashboard', (req, res) => {
    res.render('lecturerDashboard', {
      title: ' iLearn || Dashboard'
    });
});


router.post('/signup',  TeacherController.create );
router.post('/login',  TeacherController.login );
router.post('/logout',  TeacherController.logout )


module.exports = router;
