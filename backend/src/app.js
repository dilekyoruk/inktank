const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const cors = require('cors');

const User = require('./models/user');

const mongooseConnection = require('./database-connection');

// const { profile } = require('console');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const accountsRouter = require('./routes/accounts');
const tattooArtistsRouter = require('./routes/tattoo-artists');
require('./database-connection');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

if (app.get('env') == 'development') {
  /* eslint-disable-next-line */
  app.use(require('connect-livereload')());
  /* eslint-disable-next-line */
  require('livereload')
    .createServer({ extraExts: ['pug'] })
    .watch([`${__dirname}/public`, `${__dirname}/views`]);
}

app.set('trust proxy', 1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothersupernotsosecretsecret'],
    store: new MongoStore({ mongooseConnection, stringify: false }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: 'none',
      secure: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0;
  // eslint-disable-next-line no-plusplus
  req.session.viewCount++;
  next();
});

app.use('/api/', indexRouter);
app.use('/api/account', accountsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tattoo-artists', tattooArtistsRouter);
app.use('/api/tattoo-artists/profile', express.static('uploads'));
app.use('/api/tattoo-artists/photos', express.static('uploads'));
// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
