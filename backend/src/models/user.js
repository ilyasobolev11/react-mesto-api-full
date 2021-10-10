const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');

const { AuthError } = require('../middlewares/error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: 'Передан невалидный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: isURL,
      message: 'Передан невалидный URL',
    },
  },
});

userSchema.statics.findUserByCredentials = async function ({ email, password }) {
  const user = await this
    .findOne({ email })
    .select('+password')
    .orFail(new AuthError('Неправильные почта или пароль'));
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AuthError('Неправильные почта или пароль');
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
