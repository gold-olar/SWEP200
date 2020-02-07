const { Router } = require('express');

const router = Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'iLearn || Home'
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'iLearn || About Us'
  });
});

router.get('/contact_us', (req, res) => {
  res.render('contact', {
    title: ' iLearn || Contact Us'
  });
});


module.exports = router;
