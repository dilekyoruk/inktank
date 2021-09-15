const express = require('express');

const router = express.Router();
const User = require('../models/user');
const TattooArtist = require('../models/tattoo-artist');
const Photo = require('../models/photo');

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {};

  if (req.query.name) {
    query.name = req.query.name;
  }
  res.send(await User.find(query));
});

/* GET user */
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.sendStatus(404);

  res.send(user);
});

/* ADD user */
router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);

  res.send(newUser);
});

/* DELETE user */
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.sendStatus(200);
});

/* FOLLOW tattoo artist */
router.post('/:id/follow-artist', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const tattooArtist = await TattooArtist.findById(req.body.id);
    if (tattooArtist) {
      user.follow(tattooArtist);
      return res.sendStatus(200);
    }
    return res.sendStatus(404);
  }
  res.sendStatus(404);
});

router.post('/:id/book', (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    const tattooArtist = tattooArtists.find(user => user.name == req.body.tattooArtistName);
    if (!tattooArtist) {
      return res.sendStatus(404);
    }
    user.book(tattooArtist, req.body.time);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/like', (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    const photo = photos.find(photo => photo.filename == req.body.filename);
    if (!photo) {
      return res.sendStatus(404);
    }
    user.likePhoto(photo);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id/bookings', (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    res.send(user.bookings);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;

