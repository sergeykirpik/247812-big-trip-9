import {formatDate, render} from '../utils.js';
import {DayItem} from './day-item.js';
import {AbstractComponent} from './abstract-component.js';

export class DayList extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._dayItems = this._pointsByDay.map(([dayDate, events], index) =>
      this.createOwnedComponent(new DayItem({
        dayCounter: index + 1, dayDate, events}))
    );
  }

  get _pointsByDay() {
    const pointsByDay = new Map();
    this._points.forEach((it) => {
      const key = formatDate(it.startTime, `YYYY-MM-DD`);
      const collection = pointsByDay.get(key) || [];
      collection.push(it);
      pointsByDay.set(key, collection);
    });
    return Array.from(pointsByDay);
  }

  _afterElementCreated() {
    this._dayItems.forEach((it) => render(this._element, it));
  }

  get template() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
