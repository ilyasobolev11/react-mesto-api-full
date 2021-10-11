import {apiConfig} from './utils.js';

class Api {
  constructor({url, options}) {
    this._url = url;
    this._options = options;
  }

  _getResponseBody(res, textErr) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка ${textErr}: ${res.status} - ${res.statusText}`));
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      ...this._options
    })
      .then((res) => this._getResponseBody(res, 'getUserData'));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      ...this._options
    })
      .then((res) => this._getResponseBody(res, 'getInitialCards'));
  }

  updateUserData(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      ...this._options,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then((res) => this._getResponseBody(res, 'updateUserData'));
  }

  updateAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      ...this._options,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(avatar)
    })
      .then((res) => this._getResponseBody(res, 'updateAvatar'));
  }

  addCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      ...this._options,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then((res) => this._getResponseBody(res, 'sendNewCard'));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      ...this._options
    })
      .then((res) => this._getResponseBody(res, 'deleteCard'))
  }

  changeLikeCardStatus(cardId, likeStatus) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: likeStatus ? 'PUT' : 'DELETE',
      ...this._options
    })
      .then((res) => this._getResponseBody(res, 'changeLikeCardStatus'))
  }
}

const api = new Api(apiConfig);

export default api;
