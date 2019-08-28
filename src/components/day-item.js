import {formatDate, createElement, render} from '../utils.js';
import {EventList} from './event-list.js';

export class DayItem {
  constructor({dayDate, events, dayCounter}) {
    this._dayDate = dayDate;
    this._dayCounter = dayCounter;
    this._eventList = new EventList(events);
    this._element = null;
  }

  removeElement() {
    this._element = null;
    this._eventList.removeElement();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      render(this._element, this._eventList);
    }
    return this._element;
  }

  get template() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._dayCounter}</span>
        <time class="day__date" datetime="${this._dayDate}">${formatDate(new Date(this._dayDate), `MMM D`)}</time>
      </div>
      <!-- EventList -->

    </li>`.trim();
  }
}
