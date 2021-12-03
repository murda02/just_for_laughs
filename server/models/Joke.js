const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const jokeSchema = new Schema({
  jokeText: {
    type: String
  },
  jokeLikedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Joke = model('Joke', jokeSchema);

module.exports = Joke;
