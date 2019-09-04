import {BaseComponent} from '../base-component.js';

export class DayList extends BaseComponent {
  constructor(dayItems) {
    super({children: dayItems});
  }

  get template() {
    return `
      <ul class="trip-days">
      </ul>
    `.trim();
  }
}
