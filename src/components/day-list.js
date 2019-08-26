import {formatDate, createElement, render, Position} from '../utils.js';
import {DayItem} from './day-item.js';
import {TripEvent} from './trip-event.js';
import {EventEditForm} from './event-edit-form.js';

export class TripDays {
  constructor(route) {
    this._route = route;
    this._element = null;
    this._dayItems = [];
  }

  _tripEventFactory(point) {
    const tripEvent = new TripEvent(point);
    const eventEditForm = new EventEditForm(point);
    tripEvent.element.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      tripEvent.element.parentNode.replaceChild(eventEditForm.element, tripEvent.element);
    });
    eventEditForm.element.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      eventEditForm.element.parentNode.replaceChild(tripEvent.element, eventEditForm.element);
    });
    eventEditForm.element.querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      eventEditForm.element.parentNode.replaceChild(tripEvent.element, eventEditForm.element);
    });
    return tripEvent;
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
      this._dayItems = this._pointsByDay.map(([dayDate, eventList], index) =>
        new DayItem({dayCounter: index + 1, dayDate, eventList, tripEventFactory: this._tripEventFactory})
      );
      this._dayItems.forEach((it) => render(this._element, it, Position.BEFORE_END));
    }
    return this._element;
  }

  get template() {
    return `
      <ul class="trip-days">
      </ul>
    `;
  }
}
