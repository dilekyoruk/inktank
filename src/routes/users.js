const express = require('express');

const router = express.Router();
const User = require('../models/user');
const TattooArtist = require('../models/tattoo-artist');
const Photo = require('../models/photo');

const mark = new User('mark', 'berlin', 'm@gmail.com');
const kate = new User('kate', 'london', 'k@gmail.com');
const harry = new User('harry', 'amsterdam', 'a@gmail.com');

const users = [mark, kate, harry];

const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');
const emily = new TattooArtist('emily', 'berlin', 'e@gmail.com');
const tim = new TattooArtist('tim', 'london', 't@gmail.com');

const tattooArtists = [alex, emily, tim];

const photo1 = new Photo('minimalist design.jpg', 'minimalist design', 'berlin');
const photo2 = new Photo('black and white design.jpg', 'black and white', 'berlin');

const photos = [photo1, photo2];

/* GET users listing. */
router.get('/', (req, res, next) => {
  const result = users;
  if (req.query.name) {
    res.send(users.find(user => user.name == req.query.name));
  } else {
    res.send(result);
  }
});

router.get('/:id', (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    res.send(user);
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

router.post('/:id/follow-artist', (req, res, next) => {
  const user = users[req.params.id];
  if (user) {
    const tattooArtist = tattooArtists.find(user => user.name == req.body.tattooArtistName);
    if (!tattooArtist) {
      return res.sendStatus(404);
    }
    user.follow(tattooArtist);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
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

module.exports = router;
