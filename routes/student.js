const { Router } = require('express');
const StudentController = require('../controllers/student.ctrl');

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

router.post('/signup',  StudentController.create );
router.post('/login',  StudentController.login );
router.post('/logout',  StudentController.logout );


module.exports = router;
