const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const photoSchema = new mongoose.Schema({
  filename: String,
  description: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: { maxDepth: 1 },
      },
      comment: String,
    },
  ],
});

photoSchema.plugin(autopopulate);
module.exports = mongoose.model('Photo', photoSchema);
