import {BaseComponent} from "../base-component";
import {EventItem} from "../components/event-item";
import {EventEditForm} from "../components/event-edit-form";
import {replaceComponent} from "../utils";
import {PointData} from "../data";

export class PointController extends BaseComponent {
  constructor(params) {
    super(params);

    this._isInEditMode = false;

    const eventItem = new EventItem({data: this._data});
    const eventEditForm = this.addOwnedComponent(new EventEditForm({data: this._data}));

    eventItem.on2(eventItem.rollupBtn, `click`, () => {
      this._isInEditMode = true;
      this._callbacks.onEdit(this);
      replaceComponent(eventItem, eventEditForm);
    });

    eventEditForm.onSubmit((formData) => {
      const entry = new PointData({
        destination: formData.get(`event-destination`),
        startTime: new Date(formData.get(`event-start-time`)),
        endTime: new Date(formData.get(`event-end-time`)),
        price: parseInt(formData.get(`event-price`), 10),
        offers: new Set(formData.getAll(`event-offer`)),
        isFavorite: !!formData.get(`event-favorite`),
        type: formData.get(`event-type`),
      });
      this._callbacks.onDataChange(this._data, entry);
      replaceComponent(eventEditForm, eventItem);
    });
    eventEditForm.onDismiss(() => {
      if (this._isInEditMode) {
        this._isInEditMode = false;
        replaceComponent(eventEditForm, eventItem);
      }
    });
    this._element = eventItem.element;
    this._eventEditForm = eventEditForm;
  }

  dismiss() {
    if (this._isInEditMode) {
      this._eventEditForm.dismiss();
    }
  }
}
