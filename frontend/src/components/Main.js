import React from 'react';
import Card from './Card.js';
import Spinner from './Spinner.js';
import userAvatarPlaceholder from '../images/avatar.jpg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({isLoading, cards, onEditAvatar, onEditProfile, onAddPlace, ...props}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content root__content">

      <section className="profile content__profile">
        <div className="profile__user-data">
          <div className="profile__cover"
            tabIndex={0}
            onClick={onEditAvatar}
          >
            <img src={currentUser?.avatar || userAvatarPlaceholder} alt="аватар пользователя" className="profile__avatar" />
          </div>
          <div className="profile__column">
            <div className="profile__row">
              <h1 className="profile__user-name">{currentUser?.name || 'Жак-Ив Кусто'}</h1>
              <button
                className="profile__edit-btn"
                type="button"
                aria-label="Изменить данные пользовтеля"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__user-status">{currentUser?.about || 'Исследователь океана'}</p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>

      <section className="elements">
        {
          isLoading ? (
              <Spinner />
            ) :
            cards.length ? (
              <ul className="elements__list">
                {cards.map(card => (
                  <Card
                    key={card._id}
                    card={card}
                    {...props}
                  />
                ))}
              </ul>
            ) : (
              <p className="elements__text-notification">Нет добавленных мест</p>
            )
        }
      </section>

    </main>
  );
}

export default Main;
