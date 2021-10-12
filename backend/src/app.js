require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
const limiter = rateLimit({
  windowMs: 1000 * 60 * 10,
  max: 100,
  message: 'Превышено максимально допустимое количетво запросов',
});
const whiteList = ['http://mesto-app.nomoredomains.club', 'https://mesto-app.nomoredomains.club', 'http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
