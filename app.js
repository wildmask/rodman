var express = require('express');
var ejs = require('ejs');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');

var session = require('express-session');

var routes = require('./routes/index');

var ueditor = require("ueditor");

var database1 = require('./routes/database/article');
var article = new database1();

var database2 = require('./routes/database/user');
var user = new database2();

var database3 = require('./routes/database/home');
var home = new database3();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// ueditor

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


/* login and logout with session control */

// use session
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'love'
}));


// if not login and not login page, rediret to login page
app.use(function(req,res,next){
  console.log("user:" + req.session.user);
  if (!req.session.user) {
    if(req.url=="/login"|| req.url=="/"){
      next();
    }else{
      res.redirect('login');
    }
  } else if (req.session.user) {
    next();
  }
});

// login page
app.get('/login', function(req, res, next) {
  res.render('login');
});

// login request: create session
app.post('/login', function(req, res, next) {
    if(req.body.username=='rodmanzhuo' && req.body.password=='cuhk'){
      var user = {'username':'love'};
      req.session.user = user;
      res.render('console_home');
    }else{
      res.render('login');
    }
});

// logout request: delete session
app.get('/logout',function(req,res){
  req.session.user = null;
  res.render('login');
});

/* login and logout end */


// console control


app.get('/console_home', function(req, res, next) {
  res.render('console_home');
});

app.get('/console_articlelist', function(req, res, next) {
  res.render('console_articlelist');
});

app.get('/console_article', function(req, res, next) {
  res.render('console_article');
});



/* DB: article start */



app.post('/article/update', function(req, res, next) {
  article.update(req.body, function(result){
    res.send(result);
  });
});

app.post('/article/create', function(req, res, next) {
  article.create(req.body, function(result){
    res.send(result);
  });
});


app.post('/article/delete', function(req, res, next) {
  article.delete(req.body, function(result){
    res.send(result);
  });
});

app.post('/article/readCountInc', function(req, res, next) {
  article.readCountInc(req.body, function(result){
    res.send(result);
  });
});

app.post('/article/commentCountInc', function(req, res, next) {
  article.commentCountInc(req.body, function(result){
    res.send(result);
  });
});

app.post('/article/setStatus', function(req, res, next) {
  article.setStatus(req.body, function(result){
    res.send(result);
  });
});



/* DB: article end */



/* DB: home start */

app.post('/home/get', function(req, res, next) {
  home.get(req.body.name, function(result){
    res.send(result);
  });
});


app.post('/home/update', function(req, res, next) {
  home.update(req.body, function(result){
    res.send(result);
  });
});


/* DB: home end */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
