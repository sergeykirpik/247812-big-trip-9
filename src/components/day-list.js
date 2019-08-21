import {formatDate, createElement, render, Position} from '../utils.js';
import {DayItem} from '../components/day-item.js';

export class TripDays {
  constructor(route, tripEventFactory) {
    this._route = route;
    this._tripEventFactory = tripEventFactory;
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
      this._element = createElement(this._emptyTemplate);
      this._dayItems = this._pointsByDay.map(([dayDate, eventList], index) =>
        new DayItem({dayCounter: index + 1, dayDate, eventList, tripEventFactory: this._tripEventFactory})
      );
      this._dayItems.forEach((it) => render(this._element, it, Position.BEFORE_END));
    }
    return this._element;
  }

  get _emptyTemplate() {
    return `
      <ul class="trip-days">
      </ul>
    `;
  }

  get template() {
    return `
      <ul class="trip-days">
        ${this._pointsByDay.map(([dayDate, eventList], index) =>
          new DayItem({dayCounter: index + 1, dayDate, eventList}).template)
        .join(``)}
      </ul>
    `;
  }
}
