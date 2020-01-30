const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'ClassRoom'
  });
});

router.get('/lecturers', (req, res) => {
  res.render('lecturer', {
    title: 'Teacher'
  });
});

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
