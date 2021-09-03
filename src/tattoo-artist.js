class TattooArtist {
  constructor(name, location, email) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.photos = [];
    this.followers = [];
    this.ratings = [];
    this.profilePhoto = '';
    this.bio = '';
    this.reviews = [];
    this.availableTimes = [];
    this.bookings = []; // change the name
  }

  addPhoto(photo) {
    this.photos.push(photo);
  }

  addBio(bio) {
    this.bio = bio;
  }

  addAvalibiliy(time) {
    this.availableTimes.push(time);
  }

  get profile() {
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
    /*  if (this.ratings !== null && this.ratings.length > 0) {
       return this.ratings.reduce((a, b) => a + b) / this.ratings.length;
     }
     return 'NO_RATING'; */

    if (!this.ratings) return "No_rating"
    return this.ratings.reduce((a, b) => a + b) / this.ratings.length;
  }
}
module.exports = TattooArtist;
