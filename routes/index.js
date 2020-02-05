const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'ClassRoom'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us'
  });
});


router.get('/contact_us', (req, res) => {
  res.render('contact', {
    title: 'Contact Us'
  });
});


//  Lecturers 
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

// Students
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

router.get('/student-login', (req, res) => {
  res.render('studentsLogin', {
    title: 'Student || Login'
  });
})


module.exports = router;
