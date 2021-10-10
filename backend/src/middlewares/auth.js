const jwt = require('jsonwebtoken');
const { AuthError } = require('./error');

function authUser(req, res, next) {
  try {
    const token = req.cookies.jwt;

    const payload = jwt.verify(token, 'secret');
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError());
  }
}

module.exports = { authUser };
