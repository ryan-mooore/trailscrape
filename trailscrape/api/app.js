var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require("cors");

var trailsRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API endpoint
app.use('/api', trailsRouter);

var env = process.env.NODE_ENV || 'development';


// Serve static files from the React app
if (env === 'production') {
  app.get('*', function (req, res, next) {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    }
    else {
      next()
    }
  });
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
