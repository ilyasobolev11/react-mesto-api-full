const Card = require('../models/card');
const deleteTechProperties = require('../utils/deleteTechProperties');
const { NoDataFoundError, ForbiddenError, BadRequestError } = require('../middlewares/error');

async function getCards(req, res, next) {
  try {
    const cards = deleteTechProperties(
      await Card
        .find({})
        .orFail(new NoDataFoundError('Нет ни одной карточки')),
    );

    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  try {
    let card = req.body;
    const owner = req.user._id;

    card = deleteTechProperties(await Card.create({ ...card, owner }));
    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError());
    }
    next(err);
  }
}

async function deleteCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    await Card
      .findById(cardId)
      .orFail(new NoDataFoundError('Карточка с указанным id не найдена'));

    const deletedCard = await Card
      .findOneAndDelete({ _id: cardId, owner: userId })
      .orFail(new ForbiddenError());

    res.status(200).send(deletedCard);
  } catch (err) {
    next(err);
  }
}

async function likeCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = deleteTechProperties(
      await Card
        .findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: userId } },
          { new: true },
        )
        .orFail(new NoDataFoundError('Карточки с таким id не существует')),
    );

    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
}

async function dislikeCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const userId = req.user._id;

    const card = deleteTechProperties(
      await Card
        .findByIdAndUpdate(
          cardId,
          { $pull: { likes: userId } },
          { new: true },
        )
        .orFail(new NoDataFoundError('Карточки с таким id не существует')),
    );

    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
