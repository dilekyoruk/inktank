const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

router.get('/session', (req, res, next) => {
  res.send(req.session);
});

/* router.post('/', async (req, res, next) => {
  const { name, age, email, password } = req.body;

  try {
    const user = await User.register({ name, age, email }, password);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/session', passport.authenticate('local', { failWithError: true }), async (req, res) => {
  res.send(req.user);
});

router.delete('/session', async (req, res, next) => {
  await req.logout();

  req.session.regenerate(err => {
    if (err) return next(err);

    return res.sendStatus(200);
  });
}); */

module.exports = router;
