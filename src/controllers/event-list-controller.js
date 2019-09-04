import {replaceComponent, KeyCode} from "../utils";
import {EventItem} from "../components/event-item";
import {EventEditForm} from "../components/event-edit-form";
import {EventList} from "../components/event-list";
import {BaseComponent} from "../base-component";

export class EventListController extends BaseComponent {
  constructor(params) {
    super(params);
    this._element = new EventList({
      children: this._data.map((it) => this._createItem(it))
    }).element;
  }

  _createItem(eventData) {
    const eventItem = new EventItem({data: eventData});
    const eventEditForm = this.addOwnedComponent(new EventEditForm({data: eventData}));

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

}
