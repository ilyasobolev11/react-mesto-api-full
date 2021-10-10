const { celebrate, Joi } = require('celebrate');
const { uriRegExp } = require('../utils/validator');

const createCardReqValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().pattern(uriRegExp),
  }),
});

const idCardReqValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  createCardReqValidator,
  idCardReqValidator,
};
