import {apiConfig} from './utils.js';

class Api {
  constructor({url, token}) {
    this._url = url;
    this._token = token;
  }

  _getResponseBody(res, textErr) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${textErr}: ${res.status} - ${res.statusText}`));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'getUserData'));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'getInitialCards'));
  }

  updateUserData(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((res) => this._getResponseBody(res, 'updateUserData'));
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
      .then((res) => this._getResponseBody(res, 'updateAvatar'));
  }

  addCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        ...this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then((res) => this._getResponseBody(res, 'sendNewCard'));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'deleteCard'))
  }

  changeLikeCardStatus(cardId, likeStatus) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: likeStatus ? 'PUT' : 'DELETE',
      headers: this._token
    })
      .then((res) => this._getResponseBody(res, 'changeLikeCardStatus'))
  }
}

const api = new Api(apiConfig);

export default api;
