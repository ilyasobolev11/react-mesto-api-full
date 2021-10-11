const routes = require('express').Router();
const { errors } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { loginUser, createUser } = require('../controllers/users');
const { handleError, NoDataFoundError } = require('../middlewares/error');
const { authUser } = require('../middlewares/auth');
const { authUserReqValidator, registerUserReqValidator } = require('../middlewares/userReqValidator');
const { authReqValidator } = require('../middlewares/tokenReqValidator');
const { requestLogger, errorLogger } = require('../middlewares/logger');

routes.use(requestLogger);

routes.post('/signup', registerUserReqValidator, createUser);
routes.post('/signin', authUserReqValidator, loginUser);

routes.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
routes.use(authReqValidator, authUser);

routes.use('/users', usersRouter);
routes.use('/cards', cardsRouter);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected' });
});
routes.all('*', (req, res, next) => {
  next(new NoDataFoundError());
});

routes.use(errorLogger);
routes.use(errors());
routes.use((err, req, res, next) => { // eslint-disable-line
  handleError(err, res);
});

module.exports = routes;
