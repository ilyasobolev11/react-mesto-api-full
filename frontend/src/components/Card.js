import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import imagePlaceholder from '../images/img-placeholder.jpg';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const [imgLink, setImgLink] = React.useState(card.link);
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteBtnClassName = `elements__delete-btn ${isOwn && 'elements__delete-btn_visible'}`;
  const isLiked = card.likes.some(item => item._id === currentUser._id);
  const cardLikeBtnClassName = `elements__like-btn ${isLiked && 'elements__like-btn_active'}`;

  function handleImgClick() {
    onCardClick({
      action: 'open',
      ...card
    });
  }

  function handleErrorImgLoading() {
    setImgLink(imagePlaceholder);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  function handleDeleteClick() {
    onCardClick({
      action: 'delete',
      ...card
    });
  }

  return (
    <li className="elements__item">
      <article>
        <button
          className={cardDeleteBtnClassName}
          onMouseDown={evt => evt.preventDefault()}
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
        ></button>
        <img
          className="elements__item-img"
          src={imgLink}
          alt={card.name}
          onError={handleErrorImgLoading}
          onClick={handleImgClick}
        />
        <div className="elements__row">
          <h2 className="elements__item-title">{card.name}</h2>
          <div className="elements__column">
            <button
              className={cardLikeBtnClassName}
              onMouseDown={evt => evt.preventDefault()}
              onClick={handleLikeClick}
              type="button"
              aria-label="Нравится"
            ></button>
            <span className="elements__likes-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
