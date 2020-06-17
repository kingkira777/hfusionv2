const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//PAGES REQUIRES
const dashboardRouter = require('./pages/dashboard/router');
const patientRouter = require('./pages/patients/router');
const staffRouter = require('./pages/staff/router');
const calendarRouter = require('./pages/calendar/router');

//PATIENTS MENU (eg. nursing, spiritual, visitnotes, consent etc.)
const patientDemoRouter = require('./pages/patient-demographic/router');





const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'pages')));
app.use(express.static(path.join(__dirname, 'assets')));



//ROUTERS 
app.use('/', dashboardRouter);
app.use('/patients', patientRouter);
app.use('/staff', staffRouter);
app.use('/calendar',calendarRouter);

// WHEN PATIENT IS OPEN
app.use('/(:no)',patientDemoRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errors/error');
});

module.exports = app;
