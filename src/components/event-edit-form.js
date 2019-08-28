import {transferType, activityType, destinationList, availableOffers} from '../data.js';
import {capitalize, formatDate, createElement} from '../utils.js';
import {EventManager} from '../event-manager.js';

export class EventEditForm extends EventManager {
  constructor({type, label, destination, startTime, endTime, price, isFavorite, offers, destDescription, photos}) {
    super();
    this._type = type;
    this._label = label;
    this._destination = destination;
    this._startTime = startTime; // TODO: convert to date
    this._endTime = endTime; // TODO: convert to date
    this._price = price;
    this._isFavorite = isFavorite;
    this._offers = offers;
    this._destDescription = destDescription;
    this._photos = photos;
    this._element = null;

    this.destination = this.element.querySelector(`#event-destination-1`);
    this.on(this.destination, `keydown`, (evt) => evt.stopPropagation());

    this.startTime = this.element.querySelector(`#event-start-time-1`);
    this.on(this.startTime, `keydown`, (evt) => evt.stopPropagation());

    this.endTime = this.element.querySelector(`#event-end-time-1`);
    this.on(this.endTime, `keydown`, (evt) => evt.stopPropagation());

    this.eventPrice = this.element.querySelector(`#event-price-1`);
    this.on(this.eventPrice, `keydown`, (evt) => evt.stopPropagation());
  }

  get rollupBtn() {
    return this.element.querySelector(`.event__rollup-btn`);
  }

  get form() {
    return this.element.querySelector(`form`);
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  get template() {
    return `
    <li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${transferType.map((t) => `<div class="event__type-item">
                  <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">
                  <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${capitalize(t)}</label>
                </div>`).join(``)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${activityType.map((t) => `<div class="event__type-item">
                  <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}">
                  <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${capitalize(t)}</label>
                </div>`).join(``)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${this._label}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationList.map((d) => `<option value="${d}"></option>`).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(this._startTime)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(this._endTime)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
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

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${Object.entries(availableOffers).map(([k, v]) => `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${k}-1" type="checkbox" name="event-offer-${k}" ${this._offers.has(k) ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-${k}-1">
                  <span class="event__offer-title">${v.description}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${v.price}</span>
                </label>
              </div>`).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._destDescription}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._photos.map((it) => `<img
                  class="event__photo" src="${it}" alt="Event photo">
                `).join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>
  `.trim();
  }
}
