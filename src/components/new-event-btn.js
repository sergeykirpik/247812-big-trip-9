import {BaseComponent} from "../base-component";
import {eventEmmiter} from "../event-emmiter";

export class NewEventButton extends BaseComponent {
  constructor(params) {
    super(params);
    this.element.addEventListener(`click`, (evt) => this._callbacks.onClick());
  }
  get template() {
    return `
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `.trim();
  }
}
