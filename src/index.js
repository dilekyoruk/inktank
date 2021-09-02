const Person = require('./person');
const TattooArtist = require('./tattoo-artist');
const Photo = require('./photo');
const Comment = require('./comment');

// create new users
const mark = new Person('mark', 'berlin', 'm@gmail.com');
const kate = new Person('kate', 'london', 'k@gmail.com');

// create new tattoo Artists
const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');
const emily = new TattooArtist('emily', 'berlin', 'e@gmail.com');
const tim = new TattooArtist('tim', 'london', 't@gmail.com');

// check tattoo artist's followers
mark.followTattooArtist(emily);
kate.followTattooArtist(emily);
// console.log(emily.followers);

// check user's followed artists
// console.log(mark.followedTattooArtists);

// check tattoo artist's photos
const photo = new Photo('minimalist design.jpg', 'minimalist design', 'berlin');
const photoOfTattoo = new Photo('black and white design.jpg', 'black and white', 'berlin');
emily.addPhoto(photo);
emily.addPhoto(photoOfTattoo);
// console.log(emily.photos);

// check liked photos
mark.likePhoto(photo);
kate.likePhoto(photo);
kate.likePhoto(photoOfTattoo);
// console.log(photo.likedBy);

// check add bio
emily.addBio("I'm a minimalist tattoo artist");
// console.log(emily);

// check dynamic property
console.log(emily.profile);

