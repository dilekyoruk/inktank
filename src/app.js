const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const { profile } = require('console');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tattooArtistsRouter = require('./routes/tattoo-artists');

// storage engine
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tattoo-artists', tattooArtistsRouter);

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

// upload photo
app.use('/profile', express.static('uploads'));
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    success: 1,
    profile_url: `http://localhost:3000/profile/${req.file.filename}`,
  });
});

module.exports = app;
