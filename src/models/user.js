class User {
  constructor(name, location, email) {
    this.name = name;
    this.location = location;
    this.email = email;
    this.savedPhotos = [];
    this.followedArtists = [];
    this.likedPhotos = [];
    this.bookings = [];
  }

  follow(tattooArtist) {
    this.followedArtists.push(tattooArtist.name);
    tattooArtist.followers.push(this.name);
  }

  likePhoto(photo) {
    this.likedPhotos.push(photo);
    photo.likedBy.push(this);
  }

  savePhoto(photo) {
    this.savedPhotos.push(photo);
  }

  addComment(photo, comment) {
    photo.commentBy.push(this.name);
    photo.comments.push(comment);
  }

  rateArtist(artist, rating) {
    artist.ratings.push(rating);
  }

  book(artist, time) {
    this.bookings.push(artist.name, time);
    artist.bookings.push(this.name, time);
    const index = artist.availableTimes.indexOf(time);
    artist.availableTimes.splice(index,1)
  }
}

module.exports = User;
