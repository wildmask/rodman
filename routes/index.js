var express = require('express');
var router = express.Router();

var database1 = require('./database/article');
var article = new database1();

var database2 = require('./database/user');
var user = new database2();






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
