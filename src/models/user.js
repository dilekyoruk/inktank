const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const userSchema = new mongoose.Schema({
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
  savedPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  followedArtists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TattooArtist',
      autopopulate: true,
    },
  ],
  likedPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  tattooBookings: [
    {
      type: String,
    },
  ],
});

class User {
  async likePhoto(photo) {
    this.likedPhotos.push(photo);
    photo.likedBy.push(this);

    await photo.save();
    await this.save();
  }

  async follow(tattooArtist) {
    this.followedArtists.push(tattooArtist);
    tattooArtist.followers.push(this);

    await tattooArtist.save();
    await this.save();
  }

  async savePhoto(photo) {
    this.savedPhotos.push(photo);

    await this.save();
  }

  async addComment(photo, comment) {
    photo.comments.push({ user: this, comment });

    await photo.save();
    await this.save();
  }

  async rateArtist(artist, rating) {
    artist.ratings.push(rating);

    await artist.save();
  }

  async book(artist, time) {
    this.bookings.push(artist.name, time);
    artist.bookings.push(this.name, time);
    const index = artist.availableTimes.indexOf(time);
    artist.availableTimes.splice(index, 1);

    await artist.save();
    await this.save();
  }
}

userSchema.loadClass(User);
userSchema.plugin(autopopulate);
module.exports = mongoose.model('User', userSchema);


