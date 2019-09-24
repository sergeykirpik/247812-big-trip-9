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
      api.getPoints()
    ]).then(([offers, destinations, points]) => {
      this._offers = offers;
      this._destinations = destinations;
      this._points = points;
    });
  }
}

export const dataProvider = new DataProvider();
