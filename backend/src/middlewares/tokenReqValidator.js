const { Joi } = require('celebrate');
const { AuthError } = require('./error');

const cookiesSchema = Joi.object().keys({
  jwt: Joi.string().required().token().error(new AuthError()),
});

const authReqValidator = (req, res, next) => {
  const { cookies } = req;

  const { err } = cookiesSchema.validate(cookies);

  if (err) {
    next(err);
  }
  next();
};

module.exports = { authReqValidator };
