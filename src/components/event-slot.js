import {BaseComponent} from "../base-component";

export class EventSlot extends BaseComponent {
  get template() {
    return `
    <li class="trip-events__item">
      <!-- EventItem -->
      <!-- or -->
      <!-- EventEditForm -->
    </li>
    `.trim();
  }
}
