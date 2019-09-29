import {api} from "./api";

class DataProvider {
  constructor() {
    this._destinations = null;
    this._offers = null;
    this._points = null;
  }
  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  get points() {
    return this._points;
  }

  load() {
    return Promise.all([
      api.getOffers(),
      api.getDestinations(),
    ]).then(([offers, destinations]) => {
      this._offers = offers;
      this._destinations = destinations;
    });
  }
}

export const dataProvider = new DataProvider();

window.dataProvider = dataProvider;
