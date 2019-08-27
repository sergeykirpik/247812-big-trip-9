import {formatDate, createElement, render} from '../utils.js';
import {DayItem} from './day-item.js';

export class DayList {
  constructor(route) {
    this._route = route;
    this._element = null;
    this._dayItems = [];
  }

  get _pointsByDay() {
    const pointsByDay = new Map();
    this._route.points.forEach((it) => {
      const key = formatDate(it.startTime, `YYYY-MM-DD`);
      const collection = pointsByDay.get(key) || [];
      collection.push(it);
      pointsByDay.set(key, collection);
    });
    return Array.from(pointsByDay);
  }

  removeElement() {
    this._element = null;
    this._dayItems.forEach((it) => it.removeElement());
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._dayItems = this._pointsByDay.map(([dayDate, events], index) =>
        new DayItem({dayCounter: index + 1, dayDate, events})
      );
      this._dayItems.forEach((it) => render(this._element, it));
    }
    return this._element;
  }

  get template() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
