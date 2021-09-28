const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const tattooArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  bio: String,
  profilePhoto: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: { maxDepth: 1 },
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
  ratings: [
    {
      type: Number,
      autopopulate: true,
    },
  ],
  customerBookings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 },
      },
      time: Date,
    },
  ],
  reviews: [
    {
      type: String,
      autopopulate: true,
    },
  ],
  availableTimes: [
    {
      type: Date,
    },
  ],
});

class TattooArtist {
  async addPhoto(photo) {
    this.photos.push(photo);

    await this.save();
  }

  async addBio(bio) {
    this.bio = bio;

    await this.save();
  }

  async addAvailability(time) {
    this.availableTimes.push(time);

    await this.save();
  }

  get rating() {
    if (!this.ratings) return 'No_rating';
    return this.ratings.reduce((a, b) => a + b) / this.ratings.length;
  }
}

tattooArtistSchema.loadClass(TattooArtist);
tattooArtistSchema.plugin(autopopulate);
module.exports = mongoose.model('TattooArtist', tattooArtistSchema);
