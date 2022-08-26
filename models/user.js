const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors/401_unauthorized-error');
const {
  INVALID_EMAIL_OR_PASSWORD,
  EMAIL_IS_REQUIRED,
  EMAIL_INVALID,
  PASSWORD_IS_REQUIRED,
  NAME_IS_REQUIRED,
  NAME_MINLENGTH,
  NAME_MAXLENGTH,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, EMAIL_IS_REQUIRED],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: EMAIL_INVALID,
    },
  },
  password: {
    type: String,
    required: [true, PASSWORD_IS_REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, NAME_IS_REQUIRED],
    minlength: [2, NAME_MINLENGTH],
    maxlength: [30, NAME_MAXLENGTH],
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(INVALID_EMAIL_OR_PASSWORD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
