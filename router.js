const express = require('express');
const router = express.Router();
const path = require('path');

// set routers for different pages
router.get('/', function(req, res) {
  res.sendFile(__dirname + '/src/html/home_page.html');
});

router.get('/MainPage', function(req, res) {
  res.sendFile(__dirname + '/src/html/main_page.html');
});

router.get('/BasicInfo', function(req, res) {
  res.sendFile(__dirname + '/src/html/basic_info.html');
});

router.get('/MajorInfo', function(req, res) {
  res.sendFile(__dirname + '/src/html/major_info.html');
});

router.get('/Hobby', function(req, res) {
  res.sendFile(__dirname + '/src/html/hobby.html');
});

router.get('/Quiz', function(req, res) {
  res.sendFile(__dirname + '/src/html/quiz.html');
});

// export router
module.exports = router;