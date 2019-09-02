import {formatDate, render} from '../utils.js';
import {EventList} from './event-list.js';
import {AbstractComponent} from './abstract-component.js';

export class DayItem extends AbstractComponent {
  constructor(events, isFlat) {
    super();
    this._isFlat = isFlat;
    this._dayDate = formatDate(events[0].startTime, `YYYY-MM-DD`);
    this._dayCounter = events[0].dayNo;
    this._eventList = this.createOwnedComponent(new EventList(events));
  }

  _afterElementCreated() {
    render(this._element, this._eventList);
  }

  get template() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        ${this._isFlat ? `` : `
        <span class="day__counter">${this._dayCounter}</span>
        <time class="day__date" datetime="${this._dayDate}">${formatDate(new Date(this._dayDate), `MMM D`)}</time>`
        }
      </div>
      <!-- EventList -->

    </li>`.trim();
  }
}
