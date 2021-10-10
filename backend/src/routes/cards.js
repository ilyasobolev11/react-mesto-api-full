const card = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');
const { createCardReqValidator, idCardReqValidator } = require('../middlewares/cardReqValidator');

card.get('/', getCards);
card.post('/', createCardReqValidator, createCard);
card.delete('/:cardId', idCardReqValidator, deleteCard);
card.put('/:cardId/likes', idCardReqValidator, likeCard);
card.delete('/:cardId/likes', idCardReqValidator, dislikeCard);

module.exports = card;
