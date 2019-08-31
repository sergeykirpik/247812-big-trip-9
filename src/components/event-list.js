import {render, replaceComponent, KeyCode} from "../utils";
import {EventItem} from "./event-item";
import {EventEditForm} from "./event-edit-form";
import {AbstractComponent} from "./abstract-component";

export class EventList extends AbstractComponent {
  constructor(events) {
    super();
    this._items = events.map((it) => this._createItem(it));
  }

  _createItem(eventData) {
    const eventItem = this.createOwnedComponent(new EventItem(eventData));
    const eventEditForm = this.createOwnedComponent(new EventEditForm(eventData));

    eventItem.on(eventItem.rollupBtn, `click`, () => {
      replaceComponent(eventItem, eventEditForm);
    });
    eventEditForm.on(eventEditForm.rollupBtn, `click`, () => {
      replaceComponent(eventEditForm, eventItem);
    });
    eventEditForm.on(eventEditForm.form, `submit`, (evt) => {
      evt.preventDefault();
      replaceComponent(eventEditForm, eventItem);
    });
    eventEditForm.on(document, `keydown`, (evt) => {
      evt.preventDefault();
      if (evt.keyCode === KeyCode.ESC) {
        replaceComponent(eventEditForm, eventItem);
      }
    });

    return eventItem;
  }

  _afterElementCreated() {
    this._items.forEach((it) => render(this._element, it));
  }

  _beforeElementRemoved() {
    this._items.forEach((it) => it.removeElement());
  }

  get template() {
    return `
    <ul class="trip-events__list">
      <!-- EventItems -->
    </ul>
  `.trim();
  }
}
