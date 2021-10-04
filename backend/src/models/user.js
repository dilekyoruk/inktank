const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');
const passportLocalMongoose = require('passport-local-mongoose');

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
      autopopulate: { maxDepth: 1 },
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
      tattooArtist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TattooArtist',
        autopopulate: { maxDepth: 1 },
      },
      time: Date,
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

  async rateArtist(tattooArtist, rating) {
    tattooArtist.ratings.push(rating);

    await tattooArtist.save();
  }

  async book(artist, time) {
    this.tattooBookings.push({ tattooArtist: artist, time });
    artist.customerBookings.push({ user: this, time });
    /* const index = artist.availableTimes.indexOf(time);
    artist.availableTimes.splice(index, 1); */

    await artist.save();
    await this.save();
  }
}

userSchema.loadClass(User);
userSchema.plugin(autopopulate);
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});
module.exports = mongoose.model('User', userSchema);
