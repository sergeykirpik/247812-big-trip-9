import {BaseComponent} from "../base-component";

export class EventList extends BaseComponent {
  get template() {
    return `
    <ul class="trip-events__list">
      <!-- EventItems -->
    </ul>
  `.trim();
  }
}
