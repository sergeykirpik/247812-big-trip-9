import {api} from "./api";
import {Route} from "./route";

class DataProvider {
  constructor() {
    this._destinations = [];
    this._offers = [];
    this._route = new Route();
    this._isLoading = true;
  }

  addOnDataChangedCallback(callback) {
    this._route.addOnDataChangedCallback(callback);
  }

  get route() {
    return this._route;
  }

  get destinations() {
    return this._destinations;
  }

  get offers() {
    return this._offers;
  }

  get points() {
    return this._route.points;
  }

  get isLoading() {
    return this._isLoading;
  }

  load() {
    this._isLoading = true;
    return Promise.all([
      api.getOffers(),
      api.getDestinations(),
    ]).then(([offers, destinations]) => {
      this._offers = offers;
      this._destinations = destinations;
      this.route.getPoints();
      this._isLoading = false;
    });
  }
}

export const dataProvider = new DataProvider();

