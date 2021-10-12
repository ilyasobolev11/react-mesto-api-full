const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const deleteTechProperties = require('../utils/deleteTechProperties');
const { NoDataFoundError, ConflictError, BadRequestError } = require('../middlewares/error');

const { JWT_SECRET = 'secret' } = process.env;

async function getUsers(req, res, next) {
  try {
    const users = deleteTechProperties(
      await User
        .find({})
        .orFail(new NoDataFoundError('Нет ни одного зарегистрированного пользователя')),
    );

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { userId } = req.params;

    const user = deleteTechProperties(
      await User
        .findById(userId)
        .orFail(new NoDataFoundError('Пользователя с таким id не существует')),
    );

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const userId = req.user._id;

    const user = deleteTechProperties(
      await User
        .findById(userId)
        .orFail(new NoDataFoundError('Пользователя с таким id не существует')),
    );

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = deleteTechProperties(
      await User.create(
        { email, password: passwordHash },
      ),
    );

    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError(`Пользователь с ${Object.values(err.keyValue).join(', ')} уже существует`));
    }
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    let user = req.body;
    const userId = req.user._id;

    user = deleteTechProperties(
      await User
        .findByIdAndUpdate(
          userId,
          user,
          { new: true, runValidators: true },
        )
        .orFail(new NoDataFoundError('Пользователя с таким id не существует')),
    );

    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials({ email, password });

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    res
      .status(204)
      .cookie(
        'jwt',
        token,
        {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
      )
      .end();
  } catch (err) {
    next(err);
  }
}

function logoutUser(req, res, next) {
  try {
    res
      .status(204)
      .clearCookie('jwt')
      .end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  loginUser,
  logoutUser,
};
