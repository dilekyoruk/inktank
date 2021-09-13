const express = require('express');

const router = express.Router();
const TattooArtist = require('../models/tattoo-artist');

const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');
const emily = new TattooArtist('emily', 'berlin', 'e@gmail.com');
const tim = new TattooArtist('tim', 'london', 't@gmail.com');

const tattooArtists = [alex, emily, tim];

router.get('/', (req, res, next) => {
  const result = tattooArtists;
  if (req.query.name) {
    res.send(tattooArtists.find(user => user.name == req.query.name));
  } else {
    res.send(result);
  }
});

router.get('/:id', (req, res, next) => {
  const tattooArtist = tattooArtists[req.params.id];
  if (tattooArtist) {
    res.render('profile', {
      name: tattooArtist.name,
      location: tattooArtist.location,
      followerCount: tattooArtist.followers ? tattooArtist.followers.length : 0,
      photoCount: tattooArtist.photos ? tattooArtist.photos.length : 0,
      reviewCount: tattooArtist.reviews ? tattooArtist.reviews.length : 0,
      commentCount: tattooArtist.comments ? tattooArtist.comments.length : 0,
    });
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/rating', (req, res, next) => {
  const { rating } = req.body;
  const tattooArtist = tattooArtists[req.params.id];
  if (!tattooArtist) {
    res.sendStatus(404);
  }
  tattooArtist.ratings.push(rating);
  res.sendStatus(200);
});

router.post('/', (req, res, next) => {
  const tattooArtist = req.body;
  tattooArtists.push(tattooArtist);
  res.sendStatus(200);
});

router.post('/:id/available-times', (req, res, next) => {
  const tattooArtist = tattooArtists[req.params.id];
  if (!tattooArtist) {
    res.sendStatus(404);
  } else {
    tattooArtist.addAvailability(req.body.time);
    res.sendStatus(200);
  }
});

/* router.post('/upload', (req, res, next) => {
  if(req.file)
})
 */

/* router.get('/', function (req, res, next) {
  const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');
  const emily = new TattooArtist('emily', 'berlin', 'e@gmail.com');
  const tim = new TattooArtist('tim', 'london', 't@gmail.com');
  res.send([alex, emily, tim]);
});
 */

/* router.get('/alex', function (req, res, next) {
  const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');

  res.render('tattoo-artist', { title: alex, email: alex.email });
}); */

module.exports = router;
