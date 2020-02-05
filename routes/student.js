const { Router } = require('express');

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



module.exports = router;
