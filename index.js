class TattooArtist {
    constructor(name, location, email){
        this.name = name 
        this.location = location
        this.email = email
        this.photos = []
        this.followers = []
        this.following = []
        this.rating = -1
        this.profilePhoto = ''
        this.quote = ''
        this.reviews = []
       
    }
}

class User {
    constructor(name, location, email){
        this.name = name 
        this.location = location
        this.email = email
        this.savedPhotos = []
        this.savedArtists = []
        this.comments = []
    }
    followTattooArtist (tattooArtist){
      return tattooArtist.followers.push(this)
    }

    likePhoto(photo){
        photo.likedBy.push(this)
    }
    saveArtist(tattooArtist){
        this.saveArtists.push(tattooArtist)
    }
    savePhoto(photo){
        this.saveArtists.push(photo)
    }
    addComment(comment) {
         this.comments.push(comment)
    }
}

class Photo {
    constructor(filename){
        this.filename = filename
        this.likedBy = []
    } 
}
class Comment {
    constructor(comment){
        this.comment = comment
        this.likedBy = []
    } 
}



const mark = new User('mark', 'location', 'email')
const emily = new TattooArtist('emily', 'location', 'email')
console.log(mark.followTattooArtist(emily))

