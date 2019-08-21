import {TripInfo} from './components/trip-info.js';
import {Menu} from './components/menu';
import {Filter} from './components/filter';
import {Sort} from './components/trip-sort';
import {TripDays} from './components/day-list';
import {EventEditForm} from './components/event-edit-form';
import {NoPoints} from './components/no-points.js';

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
  render(tripEventsSection, new TripDays(route), Position.BEFORE_END);
  const dayEventsInsertPoint = tripEventsSection.querySelector(`.trip-events__list`);
  dayEventsInsertPoint.firstElementChild.remove();
  render(dayEventsInsertPoint, new EventEditForm(route.points[0]), Position.AFTER_BEGIN);
} else {
  render(tripEventsSection, new NoPoints(), Position.BEFORE_END);
}

const tripInfoCost = tripMain.querySelector(`.trip-info__cost-value`);
tripInfoCost.textContent = route.total;

