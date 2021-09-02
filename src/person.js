class Person {
  constructor(name, location, email) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.savedEvents = [];
    this.savedPhotos = [];
    this.followedTattooArtists = [];
    this.comments = [];
    this.likedPhotos = [];
  }

  followTattooArtist(tattooArtist) {
    this.followedTattooArtists.push(tattooArtist);
    tattooArtist.followers.push(this);
  }

  likePhoto(photo) {
    this.likedPhotos.push(photo);
    photo.likedBy.push(this)
  }

  savePhoto(photo) {
    this.savedPhotos.push(photo);
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

module.exports = Person;
