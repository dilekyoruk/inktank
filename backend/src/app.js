const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const { profile } = require('console');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tattooArtistsRouter = require('./routes/tattoo-artists');
require('./database-connection');

const app = express();

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')());
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`]);
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/tattoo-artists', tattooArtistsRouter);
app.use('/api/tattoo-artists/profile', express.static('uploads'));
app.use('/api/tattoo-artists/photos', express.static('uploads'));
// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
