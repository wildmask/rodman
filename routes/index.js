var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test');
});

router.get('/test', function(req, res, next) {
  res.render('test');
});


router.get('/ueditor', function(req, res, next) {
  res.render('ueditor');
});

module.exports = router;
