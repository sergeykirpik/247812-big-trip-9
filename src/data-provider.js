import {api} from "./api";
import {Route} from "./route";

class DataProvider {
  constructor() {
    this._destinations = null;
    this._offers = null;
    this._route = new Route();
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

  load() {
    return Promise.all([
      api.getOffers(),
      api.getDestinations(),
    ]).then(([offers, destinations]) => {
      this._offers = offers;
      this._destinations = destinations;
      this.route.getPoints();
    });
  }
}

export const dataProvider = new DataProvider();

