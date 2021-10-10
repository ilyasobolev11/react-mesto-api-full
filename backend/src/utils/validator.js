const { BadRequestError } = require('../middlewares/error');

const uriRegExp = /^https?:\/\/(www\.)?[-\w]+\.[a-z]{2,}[\w\-._~:/?#[\]@!$&'()*+,;=]*$/;

function isExist(...args) {
  const error = args.pop();
  const notExist = args.some((item) => !item);
  if (notExist) {
    throw error;
  }
}

// реализовано в соответствии с заданием
// не используется, т.к. установлен npm пакет validator
function url(target) {
  return uriRegExp.test(target);
}

function password(target) {
  if (target.length < 4) {
    throw new BadRequestError('Длина пароля должна быть больше 3 символов');
  }
}

// validator перестал использоваться после подключения и настройки celebrate и Joi
module.exports = {
  uriRegExp,
  validator: {
    isExist,
    password,
    url,
  },
};
