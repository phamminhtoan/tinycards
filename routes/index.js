const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    return res.redirect('/hello');
  }
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    return res.redirect('/');
  } else {
    res.render('Hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  return res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;
