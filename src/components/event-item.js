import {availableOffers} from "../data.js";
import {BaseComponent} from "../base-component.js";
import moment from "moment";

const getDateTime = (date) => moment(date).format();
const getTime = (date) => moment(date).format(`HH:MM`);


export class EventItem extends BaseComponent {

  get rollupBtn() {
    return this.element.querySelector(`.event__rollup-btn`);
  }

  get _duration() {
    const {startTime, endTime} = this._data;
    const d = moment.duration(moment(endTime).diff(moment(startTime)));
    return `${d.days()}D ${d.hours()}H ${d.minutes()}M`;
  }

  get template() {
    const {startTime, endTime, type, title, price, offers} = this._data;
    return `
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${title}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${getDateTime(startTime)}">
            ${getTime(startTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateTime(endTime)}">
            ${getTime(endTime)}</time>
        </p>
        <p class="event__duration">${this._duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${Array.from(offers).map((it) => `<li class="event__offer">
          <span class="event__offer-title">${availableOffers[it].description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${availableOffers[it].price}</span>
        </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `.trim();
  }
}
