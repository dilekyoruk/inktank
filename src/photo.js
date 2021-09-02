class Photo {
  constructor(filename, description, location) {
    this.filename = filename;
    this.description = description;
    this.location = location;
    this.likedBy = [];
    this.commentBy = [];
  }
}

module.exports = Photo;
