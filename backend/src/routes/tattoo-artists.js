const express = require('express');
const multer = require('multer');
const path = require('path');
const TattooArtist = require('../models/tattoo-artist');
const Photo = require('../models/photo');

const router = express.Router();

// storage engine
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
});

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

/* ADD  tattoo artist */
router.post('/', async (req, res) => {
  const newTattooArtist = new TattooArtist(req.body);
  await newTattooArtist.setPassword('test');
  await newTattooArtist.save();
  res.sendStatus(201);
});

/* DELETE tattoo artist */
router.delete('/:id', async (req, res) => {
  await TattooArtist.findByIdAndDelete(req.params.id);

  res.sendStatus(200);
});

/* GET tattoo artist's rating */
router.get('/:id/ratings', async (req, res, next) => {
  const tattooArtist = await TattooArtist.findById(req.params.id);
  if (!tattooArtist) {
    res.sendStatus(404);
  }
  const { rating } = tattooArtist;
  console.log(JSON.stringify(rating));
  //console.log(tattooArtist.rating);
  res.json(rating);
  // res.send({rating})
});

/* Get bookings */
router.get('/:id/bookings', async (req, res, next) => {
  const tattooArtist = await TattooArtist.findById(req.params.id);
  if (!tattooArtist) {
    res.sendStatus(404);
  }
  res.send(tattooArtist.customerBookings);
});

/* POST available times YYYY-MM-DDThh:mm */
router.post('/:id/available-times', async (req, res, next) => {
  const tattooArtist = await TattooArtist.findById(req.params.id);
  if (!tattooArtist) {
    res.sendStatus(404);
  } else {
    tattooArtist.addAvailability(req.body.time);
    res.sendStatus(200);
  }
});

/* POST a photo */
router.post('/:id/photos', upload.single('photo'), async (req, res) => {
  const tattooArtist = await TattooArtist.findById(req.params.id);
  if (!tattooArtist) {
    res.sendStatus(404);
  } else {
    const photo = await Photo.create({ description: req.body.description, filename: `${req.file.filename}` });
    tattooArtist.addPhoto(photo);
    res.send(photo);
  }
});

module.exports = router;
