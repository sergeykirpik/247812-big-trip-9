import {BaseComponent} from "../base-component";
import {EventItem} from "../components/event-item";
import {EventEditForm} from "../components/event-edit-form";
import {render, unrender, Position} from "../utils";
import {PointData} from "../data";

export class PointController extends BaseComponent {
  constructor(params) {
    super(params);

    this._isInEditMode = params.isInEditMode || false;
    this._element = null;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    const component = this._isInEditMode ? this._createForm() : this._createItem();
    this._element = component.element;

    return this._element;
  }

  _createItem() {
    const eventItem = new EventItem({data: this._data});
    eventItem.on2(eventItem.rollupBtn, `click`, () => {
      this._setEditMode();
      // this._callbacks.onEdit(this);
    });
    this._eventItem = eventItem;
    return eventItem;
  }

  _createForm() {
    const eventEditForm = new EventEditForm({data: this._data});
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
      this._setNormalMode();
      this._callbacks.onDataChange(this._data.isNew ? null : this._data, entry);
    });
    eventEditForm.onDelete(() => {
      this._callbacks.onDataChange(this._data, null);
    });
    eventEditForm.onDismiss(() => {
      this._setNormalMode();
    });
    this._eventEditForm = eventEditForm;
    eventEditForm.attachEventHandlers();
    return eventEditForm;
  }

  _setNormalMode() {
    if (!this._isInEditMode) {
      return;
    }
    this._isInEditMode = false;
    this.removeElement();
    render(this._eventEditForm.element, this, Position.AFTER_END);
    unrender(this._eventEditForm);
  }

  _setEditMode() {
    if (this._isInEditMode) {
      return;
    }
    this._isInEditMode = true;
    this.removeElement();
    render(this._eventItem.element, this, Position.AFTER_END);
    unrender(this._eventItem);
  }

  dismiss() {
    if (this._isInEditMode) {
      this._eventEditForm.dismiss();
    }
  }
}
