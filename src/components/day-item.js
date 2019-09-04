import {formatDate} from '../utils.js';
import {BaseComponent} from '../base-component.js';

export class DayItem extends BaseComponent {
  get template() {
    const {dayCounter, dayDate} = this._data;
    return `
    <li class="trip-days__item  day">
      <div class="day__info">
        ${!dayCounter ? `` : `
        <span class="day__counter">${dayCounter}</span>
        <time class="day__date" datetime="${dayDate}">${formatDate(new Date(dayDate), `MMM D`)}</time>`}
      </div>
      <!-- EventList -->

    </li>`.trim();
  }
}
