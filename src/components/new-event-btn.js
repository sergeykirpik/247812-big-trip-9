import {BaseComponent} from "../base-component";

export class NewEventButton extends BaseComponent {
  get template() {
    return `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `.trim();
  }
}
