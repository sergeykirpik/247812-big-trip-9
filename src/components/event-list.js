import {BaseComponent} from "../base-component";

export class EventList extends BaseComponent {
  constructor(eventItems) {
    super({children: eventItems});
  }

  get template() {
    return `
    <ul class="trip-events__list">
      <!-- EventItems -->
    </ul>
  `.trim();
  }
}
