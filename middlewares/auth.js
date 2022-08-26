const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UnauthorizedError } = require('../errors/401_unauthorized-error');
const { UNAUTHORIZED } = require('../utils/constants');

module.exports = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }
  const token = cookie.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  req.user = payload;

  next();
};
