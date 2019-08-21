import {availableOffers} from '../data.js';
import {createElement} from '../utils.js';

const getDateTime = (date) => date.toISOString().slice(0, 16);
const getTime = (date) => date.toISOString().slice(11, 16);


export class TripEvent {
  constructor({startTime, endTime, type, title, price, offers}) {
    this._startTime = startTime; // TODO: convert to Date
    this._endTime = endTime; // TODO: convert to Date
    this._type = type;
    this._title = title;
    this._price = price;
    this._offers = offers;
    this._element = null;
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

  get _duration() {
    const dur = (this._endTime.valueOf() - this._startTime.valueOf()) / 1000 / 60;
    const hours = Math.floor(dur / 60);
    const minutes = Math.floor(dur % 60);
    return `${hours}H ${minutes}M`;
  }

  get template() {
    return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._title}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${getDateTime(this._startTime)}">
              ${getTime(this._startTime)}</time>
            &mdash;
            <time class="event__end-time" datetime="${getDateTime(this._endTime)}">
              ${getTime(this._endTime)}</time>
          </p>
          <p class="event__duration">${this._duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${Array.from(this._offers).map((it) => `<li class="event__offer">
            <span class="event__offer-title">${availableOffers[it].description}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${availableOffers[it].price}</span>
          </li>`).join(``)}          
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
  }
}
