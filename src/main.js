import {TripInfo} from './components/trip-info.js';
import {Menu} from './components/menu.js';
import {Filter} from './components/filter.js';
import {Sort} from './components/trip-sort.js';
import {TripDays} from './components/day-list.js';
import {NoPoints} from './components/no-points.js';

import {TripEvent} from './components/trip-event.js'
import {EventEditForm} from './components/event-edit-form.js';


import {route, filterMethods, menuData, sortMethods} from './data.js';
import {render, Position} from './utils.js';

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-info`);
render(tripInfoContainer, new TripInfo(route), Position.AFTER_BEGIN);

const menuInsertPoint = tripMain.querySelector(`.trip-main__trip-controls h2:nth-of-type(1)`);
render(menuInsertPoint, new Menu(menuData), Position.AFTER_END);

const filterInsertPoint = tripMain.querySelector(`.trip-main__trip-controls h2:nth-of-type(2)`);
render(filterInsertPoint, new Filter(filterMethods), Position.AFTER_END);

const tripEventsSection = document.querySelector(`.trip-events`);

if (route.points.length > 0) {
  render(tripEventsSection, new Sort(sortMethods), Position.BEFORE_END);
  render(tripEventsSection,
    new TripDays(route, (point) => {
      const tripEvent = new TripEvent(point);
      const eventEditForm = new EventEditForm(point);
      tripEvent.element.querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          tripEvent.element.parentNode.replaceChild(eventEditForm.element, tripEvent.element);
        });
      eventEditForm.element.querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, () => {
          eventEditForm.element.parentNode.replaceChild(tripEvent.element, eventEditForm.element);
        });
      eventEditForm.element.querySelector(`form`)
        .addEventListener(`submit`, (evt) => {
          evt.preventDefault();
          eventEditForm.element.parentNode.replaceChild(tripEvent.element, eventEditForm.element);
        });
      return tripEvent;
    }),
    Position.BEFORE_END
  );
} else {
  render(tripEventsSection, new NoPoints(), Position.BEFORE_END);
}

const tripInfoCost = tripMain.querySelector(`.trip-info__cost-value`);
tripInfoCost.textContent = route.total;

