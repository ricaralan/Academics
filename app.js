var express  = require('express');
var path     = require('path');
var favicon  = require('serve-favicon');
var logger   = require('morgan');
var cookieParser = require('cookie-parser');
var session    = require("express-session");
var bodyParser = require('body-parser');
var passport   = require("passport");
require("./routes/passport/passport")(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : "Athenea@KeySession|~.^.~|=KEEPSESSION",
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/_admin', require('./routes/admin'));
app.use('/categories', require('./routes/admin/categories'));
app.use('/sub_categories', require('./routes/admin/sub_categories'));
app.use('/languajes', require('./routes/admin/languajes'));
app.use('/courses', require('./routes/courses/'));
app.use('/level', require('./routes/level/'));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ["user_friends","user_birthday","manage_notifications"] })
);
/* Proceso de autenticación... esperando el token de acceso */
app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
  successRedirect: '/',
  failureRedirect: '/' 
}));
app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect : "/",
  failureRedirect : "/"
}));

app.get('/auth/local', passport.authenticate('local'));
app.post("/auth/local/", passport.authenticate("local"), function(req, res) {
    loginSuccess = true;
    if(req.user.errLogin) {
      loginSuccess = false;
      req.logout();
    }
    res.send({success : loginSuccess});
  });

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
