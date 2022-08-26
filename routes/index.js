const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../utils/celebrate-validators');
const { NotFoundError } = require('../errors/404_not-found-error');
const { ROUTE_NOT_FOUND } = require('../utils/constants');

router.all('/', auth);
router.post('/signup', createUserValidator, createUser);
router.post('/signin', loginValidator, login);
router.use(auth);
router.post('/signout', logout);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', () => {
  throw new NotFoundError(ROUTE_NOT_FOUND);
});

module.exports = router;
