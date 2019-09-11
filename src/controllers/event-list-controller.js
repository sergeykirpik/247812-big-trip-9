import {replaceComponent} from "../utils";
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
    eventEditForm.onSubmit((formData) => {
      console.log(eventData);
      const entry = {
        destination: formData.get(`event-destination`),
        startTime: new Date(formData.get(`event-start-time`)),
        endTime: new Date(formData.get(`event-end-time`)),
        price: formData.get(`event-price`),
        offers: formData.getAll(`event-offer`),
        isFavorite: formData.get(`event-favorite`),
      };
      this._callbacks.onDataChange(eventData, entry);
      replaceComponent(eventEditForm, eventItem);
    });
    eventEditForm.onDismiss(() => replaceComponent(eventEditForm, eventItem));

    return eventItem;
  }

}
