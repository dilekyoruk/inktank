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
      autopopulate: true,
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
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
      type: String,
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
      type: Number,
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
}

tattooArtistSchema.loadClass(TattooArtist);
tattooArtistSchema.plugin(autopopulate);
module.exports = mongoose.model('TattooArtist', tattooArtistSchema);



/*  get profile() {
    return `
  # ${this.name} (${this.location})

  ## Bio: ${this.bio}

  ### Followers (${this.followers.length})

  #### Photos (${this.photos.length})

  ${this.photos
    .map(
      photo => `## ${photo.filename}
  💜 ${photo.likedBy.map(person => person.name).join(', ')} `
    )
    .join('\n')}
  `;
  }

  set profile(newValue) {
    throw new Error(`You can not override it`);
  }

  get rating() {

    if (!this.ratings) return 'No_rating';
    return this.ratings.reduce((a, b) => a + b) / this.ratings.length;
  }
}
module.exports = TattooArtist;
 */
