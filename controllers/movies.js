const Movie = require('../models/movie');
const { BadRequestError } = require('../errors/400_bad-request-error');
const { ForbiddenError } = require('../errors/403_forbidden-error');
const { NotFoundError } = require('../errors/404_not-found-error');
const { ConflictError } = require('../errors/409_conflict-error');
const {
  MOVIE_CONFLICT, MOVIE_NOT_FOUND, MOVIE_FORBIDDEN, MOVIE_SUCCESS_REMOVE, ID_BAD_REQUEST,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.find({ movieId, owner: req.user._id })
    .then((addedMovie) => {
      if (addedMovie.length !== 0) {
        return next(new ConflictError(MOVIE_CONFLICT));
      }
      return Movie.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        owner: req.user._id,
        movieId,
        nameRU,
        nameEN,
      })
        .then(({ _id }) => {
          Movie.findById(_id)
            .then((movie) => {
              res.send(movie);
            })
            .catch(next);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const removeMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MOVIE_NOT_FOUND));
      }
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenError(MOVIE_FORBIDDEN));
      }
      return movie.remove()
        .then(() => res.send({ message: MOVIE_SUCCESS_REMOVE }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ID_BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  removeMovie,
};
