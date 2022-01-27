var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
const db = require('./models');
const session = require('express-session');

db.sequelize.sync();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname,'/public/stylesheets')))
app.use('/js', express.static(path.join(__dirname,'/public/javascripts')))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'andrews',saveUninitialized: true, resave: true}))

// middleware to make 'user' available to all templates
app.use((req, res, next) => {
  res.locals.signUpSuccessMessage = req.session.signUpSuccessMessage;
  res.locals.signUpErrorMessage = req.session.signUpErrorMessage;
  res.locals.loginSuccessMessage = req.session.loginSuccessMessage;
  res.locals.loginErrorMessage = req.session.loginErrorMessage;
  res.locals.profileChangeMessage = req.session.profileChangeMessage;
  res.locals.portfoilioChangeMessage = req.session.portfoilioChangeMessage;
  res.locals.passwordChangeMessage = req.session.passwordChangeMessage;
  res.locals.user = req.session.user;
  res.locals.pollErrorMessage = req.session.errorPollMessage;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message)
  res.render('error');
});

module.exports = app;
