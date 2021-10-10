import { apiConfig } from './utils'

const BASE_URL = apiConfig.url;
const HEADERS = apiConfig.headers;

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status} - ${res.statusText}`));
}

export function register(userData) {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(checkResponse);
}

export function authorize(userData) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(checkResponse);
}

// Удалить?
export function getUserData() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: HEADERS
  })
    .then(checkResponse);
}
