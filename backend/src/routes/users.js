const user = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');
const {
  getUserReqValidator,
  updateUserInfoReqValidator,
  updateUserAvatarReqValidator,
} = require('../middlewares/userReqValidator');

user.get('/', getUsers);
user.get('/me', getCurrentUser);
user.patch('/me', updateUserInfoReqValidator, updateUser);
user.patch('/me/avatar', updateUserAvatarReqValidator, updateUser);
user.get('/:userId', getUserReqValidator, getUser);

module.exports = user;
