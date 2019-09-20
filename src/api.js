const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip`;
const API_KEY = `e1448a27-e086-4c77-89d2-f591f665f4a7`+Math.random(1000);

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const get = (resourse) => {
  const headers = new Headers({Authorization: `Basic ${API_KEY}`});
  return fetch(`${END_POINT}/${resourse}`, {headers})
    .then(checkStatus)
    .then(toJSON);
}

const toJSON = (response) => response.json();

class API {
  constructor() {
    this.getPoints = () => get(`points`);
    this.getDestinations = () => get(`destinations`);
    this.getOffers = () => get(`offers`);
  }
}

export const api = new API();
window.api = api;
