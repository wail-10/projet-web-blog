// var createError = require('http-errors');
const express = require('express');
const path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const app = express();

const index = require('./routes/index');
const users = require('./routes/users');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const comments = require('./routes/commentaires');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/comments', comments);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
