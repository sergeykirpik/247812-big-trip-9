import {route, sortMethods} from './data.js';
import {render} from './utils.js';
import {TripInfo} from './components/trip-info.js';
import {TripControls} from './components/trip-controls.js';
import {NewEventButton} from './components/new-event-btn.js';
import {TripSort} from './components/trip-sort.js';
import {DayList} from './components/day-list.js';
import {NoPoints} from './components/no-points.js';

const tripMain = document.querySelector(`.trip-main`);
render(tripMain, new TripInfo(route));
render(tripMain, new TripControls());
render(tripMain, new NewEventButton());

const tripEventsSection = document.querySelector(`.trip-events`);

if (route.points.length > 0) {
  render(tripEventsSection, new TripSort(sortMethods));
  render(tripEventsSection, new DayList(route));
} else {
  render(tripEventsSection, new NoPoints());
}


