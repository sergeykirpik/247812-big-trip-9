import {AbstractComponent} from "./abstract-component";

export class TripEventsSection extends AbstractComponent {
  get template() {
    return `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <!-- NoPoints -->
      <!-- or -->
      <!-- TripSort -->
      <!-- DayList -->
    </section>`.trim();
  }
}
