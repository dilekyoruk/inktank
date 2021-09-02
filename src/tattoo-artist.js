class TattooArtist {
  constructor(name, location, email) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.photos = [];
    this.followers = [];
    this.rating = [];
    this.profilePhoto = '';
    this.bio = '';
    this.reviews = [];
  }

  addPhoto(photo) {
    this.photos.push(photo);
  }

  addBio(bio) {
    this.bio = bio;
  }

  get profile() {
  return `
  # ${this.name} (${this.location})

  ## Bio: ${this.bio}

  ### Followers (${this.followers.length})

  #### Photos (${this.photos.length})

  ${this.photos.map(photo => `## ${photo.filename}
  💜 ${photo.likedBy.map((person) => person.name).join(", ")} `).join('\n')}
  `;
}

  set profile(newValue) {
    throw new Error(`You can not override it`);
  }
}

module.exports = TattooArtist;
