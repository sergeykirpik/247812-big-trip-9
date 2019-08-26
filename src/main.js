import {TripInfo} from './components/trip-info.js';
import {Menu} from './components/menu.js';
import {Filter} from './components/filter.js';
import {Sort} from './components/trip-sort.js';
import {TripDays} from './components/day-list.js';
import {NoPoints} from './components/no-points.js';

import {route, filterMethods, menuData, sortMethods} from './data.js';
import {render, Position, KeyCode, replaceComponent} from './utils.js';

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-info`);
render(tripInfoContainer, new TripInfo(route), Position.AFTER_BEGIN);

const tripControlsContainer = tripMain.querySelector(`.trip-main__trip-controls`);
render(tripControlsContainer, new Menu(menuData), Position.BEFORE_END);
render(tripControlsContainer, new Filter(filterMethods), Position.BEFORE_END);

const tripEventsSection = document.querySelector(`.trip-events`);

if (route.points.length > 0) {
  render(tripEventsSection, new Sort(sortMethods), Position.BEFORE_END);
  render(tripEventsSection, new TripDays(route), Position.BEFORE_END);
} else {
  render(tripEventsSection, new NoPoints(), Position.BEFORE_END);
}


