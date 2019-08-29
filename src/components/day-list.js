import {formatDate, render, groupBy} from '../utils.js';
import {DayItem} from './day-item.js';
import {AbstractComponent} from './abstract-component.js';

export class DayList extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
    this._dayItems = this._pointsByDay.map((events) =>
      this.createOwnedComponent(new DayItem({
        dayCounter: events[0].dayNo,
        dayDate: formatDate(events[0].startTime, `YYYY-MM-DD`),
        events
      }))
    );
  }

  get _pointsByDay() {
    return groupBy(this._points, (a, b) =>
      formatDate(a.startTime, `YYYY-MM-DD`) === formatDate(b.startTime, `YYYY-MM-DD`));
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
