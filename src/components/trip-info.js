import {BaseComponent} from "../base-component";

export class TripInfo extends BaseComponent {
  constructor({title, dates, cost}) {
    super({});
    this._title = title;
    this._dates = dates;
    this._cost = cost;
  }

  get template() {
    return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this._title}</h1>
        <p class="trip-info__dates">${this._dates}</p>
      </div>
      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${this._cost}</span>
      </p>
    </section>`.trim();
  }
}

