import {Api} from "./api";
import {RouteModel} from "../models/route";
import {PointModel} from "../models/point";

export const SortType = {
  event: (points) => points,
  time: (points) => points.slice()
    .sort((a, b) => getDuration(b) - getDuration(a)),
  price: (points) => points.slice()
    .sort((a, b) => b.price - a.price),
};

export const FilterType = {
  everything: (data) => data,
  future: (data) => data.filter((it) => it.startTime > new Date()),
  past: (data) => data.filter((it) => it.endTime < new Date()),
};

const api = new Api();

class DataProvider {
  constructor() {
    this._destinations = [];
    this._offers = [];
    this._route = new RouteModel();
    this._isLoading = true;

    this._onDataChangedCallbacks = [];
  }

  addOnDataChangedCallback(callback) {
    this._onDataChangedCallbacks.push(callback);
  }

  _notifyAll() {
    this._onDataChangedCallbacks.forEach((it) => it());
  }

  getPoints() {
    return api.getPoints().then((data) => {
      this._route.setPoints(PointModel.parsePoints(data));
      this._notifyAll();
    });
  }

  editPoint(point) {
    return api.editPoint(point).then(() => this.getPoints());
  }

  addPoint(point) {
    return api.addPoint(point).then(() => this.getPoints());
  }

  removePoint(id) {
    return api.removePoint(id).then(() => this.getPoints());
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
      api.getPoints(),
    ]).then(([offers, destinations, points]) => {
      this._offers = offers;
      this._destinations = destinations;
      this._route.setPoints(PointModel.parsePoints(points));
      this._isLoading = false;
      this._notifyAll();
    });
  }
}

export const dataProvider = new DataProvider();

