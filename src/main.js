import {getTripInfoMarkup} from './components/trip-info.js';
import {getMenuMarkup} from './components/menu';
import {getFilterMarkup} from './components/filter';
import {getTripSortMarkup} from './components/trip-sort';
import {getTripDaysMarkup} from './components/day-list';
import {getEventEditFormMarkup} from './components/event-edit-form';
import {getNoPointsMarkup} from './components/no-points.js';

import {route} from './data.js';

const render = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-info`);
render(tripInfoContainer, getTripInfoMarkup(), `afterBegin`);

const menuInsertPoint = tripMain.querySelector(`.trip-main__trip-controls h2:nth-of-type(1)`);
render(menuInsertPoint, getMenuMarkup(), `afterEnd`);

const filterInsertPoint = tripMain.querySelector(`.trip-main__trip-controls h2:nth-of-type(2)`);
render(filterInsertPoint, getFilterMarkup(), `afterEnd`);

const tripEventsSection = document.querySelector(`.trip-events`);

if (route.points.length > 0) {
  render(tripEventsSection, getTripSortMarkup(), `beforeEnd`);
  render(tripEventsSection, getTripDaysMarkup(route), `beforeEnd`);
  const dayEventsInsertPoint = tripEventsSection.querySelector(`.trip-events__list`);
  dayEventsInsertPoint.firstElementChild.remove();
  render(dayEventsInsertPoint, getEventEditFormMarkup(route.points[0]), `afterBegin`);
} else {
  render(tripEventsSection, getNoPointsMarkup(), `beforeEnd`);
}

const tripInfoCost = tripMain.querySelector(`.trip-info__cost-value`);
tripInfoCost.textContent = route.total;

