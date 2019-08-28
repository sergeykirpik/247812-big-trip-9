import {AbstractComponent} from './abstract-component.js';

export class NoPoints extends AbstractComponent {
  get template() {
    return `
      <p class="trip-events__msg">Click New Event to create your first point</p>    
    `.trim();
  }
}
