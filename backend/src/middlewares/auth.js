const jwt = require('jsonwebtoken');

const { AuthError } = require('./error');

const { JWT_SECRET = 'secret' } = process.env;

function authUser(req, res, next) {
  try {
    const token = req.cookies.jwt;

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
  } catch (err) {
    next(new AuthError());
  }
}

module.exports = { authUser };
