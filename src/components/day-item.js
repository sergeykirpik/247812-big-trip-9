import {formatDate, render} from '../utils.js';
import {EventList} from './event-list.js';
import {AbstractComponent} from './abstract-component.js';

export class DayItem extends AbstractComponent {
  constructor({dayDate, events, dayCounter}) {
    super();
    this._dayDate = dayDate;
    this._dayCounter = dayCounter;
    this._eventList = new EventList(events);
  }

  _beforeElementRemoved() {
    this._eventList.removeElement();
  }

  _afterElementCreated() {
    render(this._element, this._eventList);
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
