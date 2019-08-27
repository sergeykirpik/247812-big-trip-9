import {createElement, render, replaceComponent} from "../utils";
import {EventItem} from "./event-item";
import {EventEditForm} from "./event-edit-form";

export class EventList {
  constructor(events) {
    this._element = null;
    this._items = events.map((it) => this._createItem(it));
  }

  _createItem(eventData) {
    const eventItem = new EventItem(eventData);
    const eventEditForm = new EventEditForm(eventData);

    eventItem.on(eventItem.rollupBtn, `click`, () => {
      replaceComponent(eventItem, eventEditForm);
    });

    // eventItem.element.querySelector(`.event__rollup-btn`)
    // .addEventListener(`click`, () => {
    //   replaceComponent(eventItem, eventEditForm);
    // });

    eventEditForm.element.querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      replaceComponent(eventEditForm, eventItem);
    });
    eventEditForm.element.querySelector(`form`)
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceComponent(eventEditForm, eventItem);
    });
    return eventItem;
  }


  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
      this._items.forEach((it) => render(this._element, it));
    }
    return this._element;
  }

  get template() {
    return `
    <ul class="trip-events__list">
      <!-- EventItems -->
    </ul>
  `.trim();
  }

  removeElement() {
    this._items.forEach((it) => it.removeElement());
    this._element = null;
  }
}
