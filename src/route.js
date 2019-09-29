import moment from "moment";
import {api} from "./api";
import {PointModel} from "./point-model";

export class Route {
  constructor(points) {
    this._points = points || [];
    this._onDataChangedCallbacks = [];
  }

  addOnDataChangedCallback(callback) {
    this._onDataChangedCallbacks.push(callback);
  }

  get points() {
    return this._points;
  }

  getPoints() {
    return api.getPoints().then((data) => {
      this._points = PointModel.parsePoints(data);
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

  _notifyAll() {
    this._onDataChangedCallbacks.forEach((it) => it());
  }

  get cost() {
    return this._points.reduce((acc, it) => acc + it.total, 0);
  }

  get title() {
    if (this._points.length === 0) {
      return ``;
    }
    if (this._points.length > 3) {
      return [
        this._points[0].destination.name,
        this._points[this._points.length - 1].destination.name
      ].join(` &mdash; ... &mdash; `);
    }
    return this._points.map((it) => it.destination.name).join(` &mdash; `);
  }

  get dates() {
    if (this._points.length === 0) {
      return ``;
    }
    return [
      moment(this._points[0].startTime).format(`MMM D`),
      moment(this._points[this._points.length - 1].endTime).format(`MMM D`),
    ].join(` &mdash; `);
  }

}

