var express = require('express');
var router = express.Router();

var database1 = require('./database/article');
var article = new database1();

var database2 = require('./database/user');
var user = new database2();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// test page
router.get('/test', function(req, res, next) {
  res.render('test');
});

// ueditor test page
router.get('/ueditor', function(req, res, next) {
  res.render('ueditor');
});



// database operation
router.get('/database', function(req, res, next) {
    console.log("hello");
    article.save("hello", function(result){
      res.send(result);
    });
});

// test for database operation
router.get('/test/update', function(req, res, next) {
    article.update("hello", function(result){
      res.send(result);
    });
    article.readCountInc(1, function(result){
      console.log("hello");
    });
});



module.exports = router;
