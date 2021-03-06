import { apiConfig } from './utils'

const BASE_URL = apiConfig.url;
const OPTIONS = apiConfig.options;

function checkResponse(res) {
  if (res.status === 204) return;
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
    ...OPTIONS,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
    .then(checkResponse);
}

export function logout() {
  return fetch(`${BASE_URL}/signout`, {
    method: 'DELETE',
    ...OPTIONS
  })
    .then(checkResponse);
}
