import {TransferType, ActivityType, labels} from '../data.js';
import {capitalize, KeyCode} from '../utils.js';
import flatpickr from 'flatpickr';
import {BaseComponent} from '../base-component.js';

export class EventEditForm extends BaseComponent {
  constructor(params) {
    super(params);

    this._destinations = params.destinations;
    this._offers = params.offers;

    this._onDismiss = () => {};
    this._onSubmit = () => {};
    this._onDelete = () => {};

    const flatpickrOptions = {
      altInput: true,
      altFormat: `d.m.Y H:i`,
      enableTime: true,
    };

    const form = this.element;
    this.on(form, `keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ENTER) {
        evt.preventDefault();
      }
    });
    this.on(form, `submit`, (evt) => {
      evt.preventDefault();
      this._onSubmit(new FormData(form));
    });
    this.on(form, `reset`, (evt) => {
      evt.preventDefault();
      this._onDelete();
    });
    const destination = form.querySelector(`.event__input--destination`);
    this.on(destination, `change`, () => {
      this._updateDestinationSection(destination.value);
    });
    const flatpickrOnOpen = (element) => {
      return () => {
        const handler = this.on(document, `keydown`, (evt) => {
          if (evt.keyCode === KeyCode.ESC) {
            evt.stopPropagation();
            element._flatpickr.close();
            this.off(handler);
          }
        }, true);
        this.attachEventHandlers();
      };
    };

    const startTime = this.element.querySelector(`#event-start-time-1`);
    flatpickr(startTime, Object.assign({
      defaultDate: this._data.startTime,
      onOpen: flatpickrOnOpen(startTime),
    }, flatpickrOptions));

    const endTime = this.element.querySelector(`#event-end-time-1`);
    flatpickr(endTime, Object.assign({
      defaultDate: this._data.endTime,
      onOpen: flatpickrOnOpen(endTime),
    }, flatpickrOptions));

    const eventTypeIcon = form.querySelector(`.event__type-icon`);
    const eventTypeToggle = form.querySelector(`.event__type-toggle`);
    this.on(eventTypeToggle, `click`, () => {
      const handler = this.on(document, `keydown`, (evt) => {
        if (evt.keyCode === KeyCode.ESC) {
          evt.stopPropagation();
          eventTypeToggle.checked = false;
          this.off(handler);
        }
      }, true);
      this.attachEventHandlers();
    });
    const eventLabel = form.querySelector(`.event__label`);
    const eventInput = form.querySelector(`.event__input`);

    const eventTypeRadios = form.querySelectorAll(`.event__type-input`);
    eventTypeRadios.forEach((r) => this.on(r, `change`, (evt) => {
      eventTypeIcon.src = `img/icons/${evt.target.value}.png`;
      eventLabel.textContent = labels[evt.target.value];
      eventTypeToggle.checked = false;
      eventInput.value = ``;
      this._updateOffersSection(evt.target.value);
      this._updateDestinationSection();
    }));

    const rollupBtn = form.querySelector(`.event__rollup-btn`);
    this.on(rollupBtn, `click`, () => this.dismiss());

    this.on(document, `keydown`, (evt) => {
      if (evt.keyCode === KeyCode.ESC) {
        this.dismiss();
      }
    }, false);
  }

  _updateOffersSection(type) {
    const section = this.element.querySelector(`.event__section--offers`);
    const container = section.querySelector(`.event__available-offers`);

    const offersIndex = this._offers.findIndex((it) => it.type === type);
    this._data.offers = this._offers[offersIndex].offers;

    section.classList.toggle(`visually-hidden`, this._data.offers.length === 0);

    const template = `${this._data.offers.map((v, index) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer" value="${v.title}">
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${v.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${v.price}</span>
        </label>
      </div>`).join(``)}`;

    container.innerHTML = template;
  }

  _updateDestinationSection(destinationName) {
    const eventDetailsSec = this.element.querySelector(`.event__details`);
    const destinationSec = eventDetailsSec.querySelector(`.event__section--destination`);
    eventDetailsSec.classList.toggle(`visually-hidden`, !destinationName);
    destinationSec.classList.toggle(`visually-hidden`, !destinationName);
    if (!destinationName) {
      return;
    }
    const idx = this._destinations.findIndex((it) => it.name === destinationName);
    const destination = this._destinations[idx];
    destinationSec.querySelector(`.event__destination-description`)
      .textContent = destination.description;

    this._data.destination = destination;

    const photosTape = destinationSec.querySelector(`.event__photos-tape`);

    const template = `${destination.pictures.map((it) =>
      `<img class="event__photo" src="${it.src}" alt="${it.description}">`).join(``)}
    `.trim();

    photosTape.innerHTML = template;
  }

  dismiss() {
    this._onDismiss();
  }

  onDismiss(handler) {
    this._onDismiss = handler;
  }

  onSubmit(handler) {
    this._onSubmit = handler;
  }

  onDelete(handler) {
    this._onDelete = handler;
  }

  get template() {
    const {type, label, startTime, endTime, price, isFavorite, offers, destination} = this._data;
    const offersSectionVisibility = offers.length === 0 ? `visually-hidden` : ``;
    const destinationSectionVisibility = destination.name === `` ? `visually-hidden` : ``;
    const eventDetailsSectionVisibility = destination.name === `` ? `visually-hidden` : ``;
    const destinations = this._destinations;
    return `
    <form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${TransferType.map((t) => `<div class="event__type-item">
                <input ${t === type ? `checked` : ``} id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">
                <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${capitalize(t)}</label>
              </div>`).join(``)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${ActivityType.map((t) => `<div class="event__type-item">
                <input ${t === type ? `checked` : ``} id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">
                <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${capitalize(t)}</label>
              </div>`).join(``)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${label}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinations.map((d) => `<option value="${d.name}"></option>`).join(``)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime ? startTime.valueOf() : ``}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime ? endTime.valueOf() : ``}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price ? price : ``}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details ${eventDetailsSectionVisibility}">

        <section class="event__section  event__section--offers  ${offersSectionVisibility}">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offers.map((v, index) => `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer" value="${v.title}" ${v.accepted ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-${index}">
                <span class="event__offer-title">${v.title}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${v.price}</span>
              </label>
            </div>`).join(``)}
          </div>
        </section>

        <section class="event__section  event__section--destination  ${destinationSectionVisibility}">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${destination.pictures.map((it) => `<img
                class="event__photo" src="${it.src}" alt="${it.description}">
              `).join(``)}
            </div>
          </div>
        </section>
      </section>
    </form>
  `.trim();
  }
}
