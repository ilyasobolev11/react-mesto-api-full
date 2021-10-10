const { celebrate, Joi } = require('celebrate');
const { uriRegExp } = require('../utils/validator');

const registerUserReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri().pattern(uriRegExp),
  }),
});

const authUserReqValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
});

const updateUserInfoReqValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
    .min(1),
});

const updateUserAvatarReqValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().pattern(uriRegExp),
  }),
});

const getUserReqValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  registerUserReqValidator,
  authUserReqValidator,
  updateUserInfoReqValidator,
  updateUserAvatarReqValidator,
  getUserReqValidator,
};
