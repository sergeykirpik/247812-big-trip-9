import {formatDate} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class DayItem extends BaseComponent {
  constructor({dayCounter, dayDate, eventList}) {
    super({children: [eventList]});
    this._dayDate = dayDate;
    this._dayCounter = dayCounter;
  }

  get template() {
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        ${!this._dayCounter ? `` : `
        <span class="day__counter">${this._dayCounter}</span>
        <time class="day__date" datetime="${this._dayDate}">${formatDate(new Date(this._dayDate), `MMM D`)}</time>`}
      </div>
      <!-- EventList -->

    </li>`.trim();
  }
}
