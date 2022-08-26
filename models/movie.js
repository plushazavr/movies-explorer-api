const mongoose = require('mongoose');
const validator = require('validator');

const {
  COUNTRY_IS_REQUIRED,
  DIRECTOR_IS_REQUIRED,
  DURATION_IS_REQUIRED,
  YEAR_IS_REQUIRED,
  DESCRIPTION_IS_REQUIRED,
  IMAGE_IS_REQUIRED,
  IMAGE_INVALID,
  TRAILER_IS_REQUIRED,
  TRAILER_INVALID,
  THUMBNAIL_IS_REQUIRED,
  THUMBNAIL_INVALID,
  MOVIE_ID_IS_REQUIRED,
  NAME_RU_IS_REQUIRED,
  NAME_EN_IS_REQUIRED,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, COUNTRY_IS_REQUIRED],
  },
  director: {
    type: String,
    required: [true, DIRECTOR_IS_REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, DURATION_IS_REQUIRED],
  },
  year: {
    type: String,
    required: [true, YEAR_IS_REQUIRED],
  },
  description: {
    type: String,
    required: [true, DESCRIPTION_IS_REQUIRED],
  },
  image: {
    type: String,
    required: [true, IMAGE_IS_REQUIRED],
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: IMAGE_INVALID,
    },
  },
  trailer: {
    type: String,
    required: [true, TRAILER_IS_REQUIRED],
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: TRAILER_INVALID,
    },
  },
  thumbnail: {
    type: String,
    required: [true, THUMBNAIL_IS_REQUIRED],
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: THUMBNAIL_INVALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_ID_IS_REQUIRED],
  },
  nameRU: {
    type: String,
    required: [true, NAME_RU_IS_REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, NAME_EN_IS_REQUIRED],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
