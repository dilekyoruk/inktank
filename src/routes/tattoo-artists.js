const express = require('express');

const router = express.Router();
const TattooArtist = require('../models/tattoo-artist');


/* GET tattoo artists listing. */
router.get('/', async (req, res) => {
  const query = {};

  if (req.query.name) {
    query.name = req.query.name;
  }
  res.send(await TattooArtist.find(query));
});

/* GET tattoo artist */
router.get('/:id', async (req, res) => {
  const tattooArtist = await TattooArtist.findById(req.params.id);

  if (!tattooArtist) return res.sendStatus(404);

  res.send(tattooArtist);
});

/* ADD tattoo artist */
router.post('/', async (req, res) => {
  const newTattooArtist = await TattooArtist.create(req.body);

  res.send(newTattooArtist);
});

/* DELETE tattoo artist */
router.delete('/:id', async (req, res) => {
  await TattooArtist.findByIdAndDelete(req.params.id);

  res.sendStatus(200);
});


/* router.get('/:id', (req, res, next) => {
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
}); */

router.post('/:id/rating', (req, res, next) => {
  const { rating } = req.body;
  const tattooArtist = TattooArtist[req.params.id];
  if (!tattooArtist) {
    res.sendStatus(404);
  }
  TattooArtist.ratings.push(rating);
  res.sendStatus(200);
});

router.post('/', (req, res, next) => {
  const tattooArtist = req.body;
  TattooArtist.push(tattooArtist);
  res.sendStatus(200);
});

router.post('/:id/available-times', (req, res, next) => {
  const tattooArtist = TattooArtist[req.params.id];
  if (!tattooArtist) {
    res.sendStatus(404);
  } else {
    tattooArtist.addAvailability(req.body.time);
    res.sendStatus(200);
  }
});

module.exports = router;
