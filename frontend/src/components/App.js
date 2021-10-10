import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardConfirmPopup from './DeleteCardConfirmPopup.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import PreLoginRoute from './PreLoginRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import * as authApi from '../utils/authApi.js'

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [infoTooltipState, setInfoTooltipState] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [isContentLoading, setIsContentLoading] = React.useState(true);
  const isDeleteCardConfirmPopupOpen = selectedCard?.action === 'delete';
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function openInfoTooltip(status) {
    setInfoTooltipState({
      isOpen: true,
      status
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipState(null);
    setSelectedCard(null);
  }

  function handleUpdateUser(newUserData) {
    api.updateUserData(newUserData)
      .then((userData) => {
        setCurrentUser(state => Object.assign(state, userData));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(newAvatar) {
    api.updateAvatar(newAvatar)
      .then((userData) => {
        setCurrentUser(state => Object.assign(state, userData));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(targetCard, isLiked) {
    api.changeLikeCardStatus(targetCard._id, !isLiked)
      .then(newCard => {
        setCards((state) => state.map(card => card._id === targetCard._id ? newCard : card))
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(targetCard) {
    api.deleteCard(targetCard._id)
      .then(() => {
        setCards((state) => state.filter(card => card._id !== targetCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterUser(userData) {
    authApi.register(userData)
      .then(data => {
        if (data) {
          openInfoTooltip('successRegister');
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip('error');
      });
  }

  function handleLogin(userData) {
    setLoggedIn(true);
    setCurrentUser({...userData})
  }

  function handleLogout() {
    history.push('/sign-in');
    localStorage.removeItem('JWT');
    setLoggedIn(false);
    setCurrentUser(null);
    setCards([]);
  }

  function handleAuthorizeUser(userData) {
    authApi.authorize(userData)
      .then(data => {
        if (data.token) {
          localStorage.setItem('JWT', data.token);
          handleLogin({email: userData.email});
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltip('error');
      });
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      authApi.getUserData(jwt)
        .then(({data}) => {
          handleLogin({email: data.email})
          setInitialLoad(false);
        })
        .catch((err) => console.log(err));
    } else {
      setInitialLoad(false);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      setIsContentLoading(true);
      Promise.all([
        api.getUserData('/users/me'),
        api.getInitialCards('/cards')
      ])
        .then(([userData, initialCards]) => {
          setCurrentUser(state => Object.assign(state, userData));
          setCards(initialCards);
        })
        .catch((err) => console.log(err))
        .finally(() => setIsContentLoading(false));
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onLogoutClick={handleLogout} />

      <Switch>
        <PreLoginRoute
          component={Register}
          path="/sign-up"
          loggedIn={loggedIn}
          onRegisterUserSubmit={handleRegisterUser}
        />

        <PreLoginRoute
          component={Login}
          path="/sign-in"
          loggedIn={loggedIn}
          onAuthorizeUserSubmit={handleAuthorizeUser}
        />

        <ProtectedRoute
          component={Main}
          loggedIn={loggedIn}
          path="/"
          exact
          initialLoad={initialLoad}
          isLoading={isContentLoading}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Route>
          <p>Это не те дроиды, что вы ищете.</p>
        </Route>
      </Switch>

      <Route path={["/sign-up", "/sign-in"]}
        render={() => {
          return (
            <InfoTooltip
              state={infoTooltipState}
              onClose={closeAllPopups}
            />
          );
        }}
      />

      <Route path="/" exact>
        <Footer />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlaceSubmit={handleAddPlaceSubmit} />

        <DeleteCardConfirmPopup
          card={selectedCard}
          isOpen={isDeleteCardConfirmPopupOpen}
          onClose={closeAllPopups}
          onDeleteCardSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </Route>

    </CurrentUserContext.Provider>
  );
}

export default App;
