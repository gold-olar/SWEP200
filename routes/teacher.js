const { Router } = require('express');

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
  




module.exports = router;
