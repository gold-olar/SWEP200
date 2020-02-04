const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'ClassRoom'
  });
});

router.get('/contact_us', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});

router.get('/lecturers', (req, res) => {
  res.render('lecturer', {
    title: 'Teacher'
  });
});

router.get('/lecturer-login', (req, res) => {
  res.render('lectureLogin', {
    title: "Lecturer's || Login",
  })
})
router.get('/lecturer_sign_up', (req, res) => {
  res.render('lectureSignup', {
    title: "Lecturer's || Sign Up",
  })
})
router.get('/student', (req, res) => {
  res.render('student', {
    title: 'Student'
  });
});

router.get('/student_sign_up', (req, res) => {
  res.render('studentSignUp', {
    title: 'Student || Sign Up'
  })
})

module.exports = router;
