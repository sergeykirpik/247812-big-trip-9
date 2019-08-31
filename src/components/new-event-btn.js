import {AbstractComponent} from "./abstract-component";

export class NewEventButton extends AbstractComponent {
  get template() {
    return `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `.trim();
  }
}
