var express = require('express');
var router = express.Router();

var database1 = require('./database/article');
var article = new database1();

var database2 = require('./database/user');
var user = new database2();

var database3 = require('./database/home');
var home = new database3();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// database operation
router.get('/database', function(req, res, next) {
    console.log("hello");
    article.save("hello", function(result){
      res.send(result);
    });
});

router.post('/home/getall', function(req, res, next) {
  home.getall("hello", function(result){
    res.send(result);
  });
});


module.exports = router;
