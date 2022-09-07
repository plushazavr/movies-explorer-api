const router = require('express').Router();
const { getMovies, addMovie, removeMovie } = require('../controllers/movies');
const { addMovieValidator, removeMovieValidator } = require('../utils/celebrate-validators');

router.get('/', getMovies);
router.post('/', addMovieValidator, addMovie);
router.delete('/:movieId', removeMovieValidator, removeMovie);

module.exports = router;
