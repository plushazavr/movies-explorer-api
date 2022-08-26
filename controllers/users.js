const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');
const {
  OK, EMAIL_CONFLICT, USER_NOT_FOUND, GOODBYE,
} = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, password: hash, name })
        .then(({ _id }) => {
          User.findById(_id).select()
            .then((user) => res.status(201).send(user))
            .catch(next);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else if (err.name === 'MongoError' && err.code === 11000) {
            next(new ConflictError(EMAIL_CONFLICT));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true }).send({ message: OK });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.clearCookie('jwt').send({ message: GOODBYE });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND));
      }
      return res.send(user);
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { email, name } = req.body;
  User.find({ email })
    .then((existingUser) => {
      if (existingUser.length !== 0) {
        if (existingUser[0]._id.toString() !== req.user._id) {
          return next(new ConflictError(EMAIL_CONFLICT));
        }
      }
      return User.findByIdAndUpdate(req.user._id, { email, name }, {
        new: true,
        runValidators: true,
      })
        .then((user) => {
          if (!user) {
            return next(new NotFoundError(USER_NOT_FOUND));
          }
          return res.send(user);
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

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  updateCurrentUser,
};
