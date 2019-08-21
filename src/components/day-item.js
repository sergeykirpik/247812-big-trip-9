import {formatDate, createElement, render, Position} from '../utils.js';
import {TripEvent} from './trip-event.js';

export class DayItem {
  constructor({dayDate, eventList, dayCounter, tripEventFactory}) {
    this._dayDate = dayDate;
    this._eventList = eventList;
    this._dayCounter = dayCounter;
    this._tripEventFactory = tripEventFactory || ((it) => new TripEvent(it));
    this._tripEventItems = [];
    this._element = null;
  }

  removeElement() {
    this._element = null;
    this._tripEventItems.forEach((it) => it.removeElement());
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.emptyTemplate);
      this._tripEventItems = this._eventList.map((it) => this._tripEventFactory(it));
      const tripEventsContainer = this._element.querySelector(`.trip-events__list`);
      this._tripEventItems.forEach((it) => render(tripEventsContainer, it, Position.BEFORE_END));
    }
    return this._element;
  }

  get emptyTemplate() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._dayCounter}</span>
          <time class="day__date" datetime="${this._dayDate}">${formatDate(new Date(this._dayDate), `MMM D`)}</time>
        </div>

        <ul class="trip-events__list">

        </ul>
      </li>
    `;
  }

  get template() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._dayCounter}</span>
          <time class="day__date" datetime="${this._dayDate}">${formatDate(new Date(this._dayDate), `MMM D`)}</time>
        </div>

        <ul class="trip-events__list">
          ${this._eventList.map((it) => new TripEvent(it).template).join(``)}
        </ul>
      </li>
    `;
  }
}
