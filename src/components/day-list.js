import {render} from '../utils.js';
import {AbstractComponent} from './abstract-component.js';

export class DayList extends AbstractComponent {
  constructor(dayList) {
    super();
    this._dayItems = dayList.map((it) => this.createOwnedComponent(it));
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
