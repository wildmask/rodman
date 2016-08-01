var express = require('express');
var router = express.Router();

var database = require('./database');

var db = new database();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/test', function(req, res, next) {
  res.render('test');
});


router.get('/ueditor', function(req, res, next) {
  res.render('ueditor');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/console', function(req, res, next) {
  res.render('console');
});


router.get('/database', function(req, res, next) {
  	console.log("hello");
  	db.test("hello", function(result){
		res.send(result);
	});
});


module.exports = router;
