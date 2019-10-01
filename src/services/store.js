import {PointModel} from "../models/point";

export class Store {
  constructor(storeKey, storage) {
    this._storeKey = storeKey;
    this._storage = storage;
  }

  setItem(key, data) {
    const storedObject = JSON.parse(this._storage.getItem(this._storeKey)) || {};
    storedObject[key] = data;
    this._storage.setItem(this._storeKey, JSON.stringify(storedObject));
  }

  getItem(key) {
    const storedObject = JSON.parse(this._storage.getItem(this._storeKey)) || {};
    return storedObject[key];
  }

  getItemAsync(key) {
    return Promise.resolve(this.getItem(key));
  }

  getPoints() {
    return this.getItemAsync(`points`).then((points) =>
      Promise.resolve(PointModel.parsePoints(points)));
  }

  getDestinations() {
    return this.getItemAsync(`destinations`);
  }

  getOffers() {
    return this.getItemAsync(`offers`);
  }

  setPoints(points) {
    this.setItem(`points`, points.map((p) => PointModel.raw(p)));
  }

  editPoint(point) {
    return this.getPoints().then((points) => {
      const idx = points.findIndex((it) => it.id === point.id);
      points[idx] = point;
      this.setPoints(points);
    });
  }

  removePoint(id) {
    return this.getPoints().then((points) => {
      const idx = points.findIndex((it) => it.id === id);
      points.splice(idx, 1);
      this.setPoints(points);
    });
  }

  addPoint(point) {
    return this.getPoints().then((points) => {
      point.id = Math.max(...points.map((it) => it.id)) + 1;
      points.push(point);
      this.setPoints(points);
    });
  }

}
