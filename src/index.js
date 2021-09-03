const Person = require('./person');
const TattooArtist = require('./tattoo-artist');
const Photo = require('./photo');
const Comment = require('./comment');

// ----- create new users ---------
const mark = new Person('mark', 'berlin', 'm@gmail.com');
const kate = new Person('kate', 'london', 'k@gmail.com');

// ----- create new tattoo Artists ---------
const alex = new TattooArtist('alex', 'paris', 'a@gmail.com');
const emily = new TattooArtist('emily', 'berlin', 'e@gmail.com');
const tim = new TattooArtist('tim', 'london', 't@gmail.com');

// ----- check tattoo artist's and user's followers ---------
mark.follow(emily);
kate.follow(emily);
// console.log(emily.followers);
// console.log(mark.followedTattooArtists);

// ----- check tattoo artist's photos ---------
const photo = new Photo('minimalist design.jpg', 'minimalist design', 'berlin');
const photoOfTattoo = new Photo('black and white design.jpg', 'black and white', 'berlin');
emily.addPhoto(photo);
emily.addPhoto(photoOfTattoo);
// console.log(emily.photos);

// ----- check liked photos ---------
mark.likePhoto(photo);
kate.likePhoto(photo);
kate.likePhoto(photoOfTattoo);
// console.log(photo.likedBy);

// -----  check add bio ---------
emily.addBio("I'm a minimalist tattoo artist");
// console.log(emily);

// ----- check dynamic property ---------
// console.log(emily.profile);

// ----- check rating ---------
mark.rateArtist(emily, 5)
kate.rateArtist(emily, 3);
console.log(emily.rating)


// ----- check booking ---------
emily.addAvalibiliy('30 Aug 2021');
emily.addAvalibiliy('29 Aug 2021');
emily.addAvalibiliy('28 Aug 2021');
mark.book(emily, '28 Aug 2021');

/* console.log(emily.bookings)
console.log(mark.bookings)
console.log(emily.availableTimes); */

// ----- check comment ---------
mark.addComment(photo, "This is awesome!")
kate.addComment(photo, 'I like this!');
console.log(photo.comments)
console.log(photo.commentBy);