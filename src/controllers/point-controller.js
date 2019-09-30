import {BaseComponent} from "../base-component";
import {EventItem} from "../components/event-item";
import {EventEditForm} from "../components/event-edit-form";
import {render, unrender, Position} from "../utils";
import {PointModel} from "../point-model";
import {dataProvider} from "../data-provider";
import {eventEmmiter} from "../event-emmiter";

export class PointController extends BaseComponent {
  constructor(params) {
    super(params);
    this._isInEditMode = params.isInEditMode || false;
    this._element = null;

    this._callbacks.onDismiss = this._callbacks.onDismiss || (() => {});

    if (this._isInEditMode) {
      eventEmmiter.on(`eventEditFormOpened`, (id) => {
        if (this._data.id !== id) {
          this.dismiss();
        }
      });
    }

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
    eventItem.rollupBtn.addEventListener(`click`, () => {
      this._setEditMode();
    });
    this._eventItem = eventItem;
    return eventItem;
  }

  _createForm() {
    const eventEditForm = new EventEditForm({
      data: this._data,
      destinations: dataProvider.destinations,
      offers: dataProvider.offers,
    });

    eventEditForm.onSubmit((formData) => {
      const name = formData.get(`event-destination`);
      const destination = dataProvider.destinations.find((it) => it.name === name);
      const eventType = formData.get(`event-type`);
      const offersForType = dataProvider.offers.find((it) => it.type === formData.get(`event-type`)).offers;

      const acceptedOffers = formData.getAll(`event-offer`);
      const offers = offersForType.map(({title, price}) => ({title, price, accepted: acceptedOffers.includes(title)}));
      const entry = new PointModel({
        id: this._data.id,
        destination,
        offers,
        startTime: new Date(formData.get(`event-start-time`)),
        endTime: new Date(formData.get(`event-end-time`)),
        price: parseInt(formData.get(`event-price`), 10),
        isFavorite: !!formData.get(`event-favorite`),
        type: eventType,
      });

      const methodName = entry.id === null ? `addPoint` : `editPoint`;

      eventEditForm.setSavingState();
      dataProvider.route[methodName](entry).then(() => this.dismiss()).catch((e) => {
        const errors = JSON.parse(e.message).errors;
        const field2Element = {
          [`base_price`]: `event-price`,
          [`destination`]: `event-destination`,
        };
        eventEditForm.setErrorState(errors.map((it) => field2Element[it.fieldName]));
      });
    });
    eventEditForm.onDelete(() => {
      eventEditForm.setDeletingState();
      dataProvider.route.removePoint(this._data.id).catch(() => {
        eventEditForm.setErrorState([]);
      });
    });
    eventEditForm.onDismiss(() => {
      this._setNormalMode();
      this._callbacks.onDismiss();
    });
    this._eventEditForm = eventEditForm;
    return eventEditForm;
  }

  _setNormalMode() {
    if (!this._isInEditMode) {
      return;
    }
    this._isInEditMode = false;
    this.removeElement();
    if (this._data.id) {
      render(this._eventEditForm.element, this, Position.AFTER_END);
    }
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

    eventEmmiter.emit(`eventEditFormOpened`, this._data.id);
    eventEmmiter.on(`eventEditFormOpened`, (id) => {
      if (this._data.id !== id) {
        this.dismiss();
      }
    });
  }

  dismiss() {
    if (this._isInEditMode) {
      this._eventEditForm.dismiss();
    }
  }
}
