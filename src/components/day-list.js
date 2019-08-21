import {formatDate, createElement} from '../utils.js';
import {TripEvent} from './trip-event.js';

export class TripDays {
  constructor(route) {
    this._route = route;
    this._element = null;
  }

  removeElement() {
    this._element = null;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  get template() {
    const pointsByDay = new Map();
    this._route.points.forEach((it) => {
      const key = formatDate(it.startTime, `YYYY-MM-DD`);
      const collection = pointsByDay.get(key) || [];
      collection.push(it);
      pointsByDay.set(key, collection);
    });
    let dayCounter = 1;
    return `
      <ul class="trip-days">
        ${Array.from(pointsByDay).map(([day, eventList]) => `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${dayCounter++}</span>
            <time class="day__date" datetime="${day}">${formatDate(new Date(day), `MMM D`)}</time>
          </div>
  
          <ul class="trip-events__list">
            ${eventList.map((it) => new TripEvent(it).template).join(``)}
          </ul>
        </li>`).join(``)}
      </ul>
    `;
  }
}
