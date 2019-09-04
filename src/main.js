import '../node_modules/flatpickr/dist/flatpickr.min.css';

import {route} from './data.js';
import {render} from './utils.js';
import {TripInfo} from './components/trip-info.js';
import {TripControls} from './components/trip-controls.js';
import {NewEventButton} from './components/new-event-btn.js';
import {TripController} from './controllers/trip-controller.js';
import {menuData, filterMethods} from './data.js';
import {Menu} from './components/menu';
import {Filter} from './components/filter';

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(route));
render(tripMain, new TripControls({children: [
  new Menu(menuData),
  new Filter(filterMethods),
]}));
render(tripMain, new NewEventButton({}));

const mainContainer = document.querySelector(`main .page-body__container`);
render(mainContainer, new TripController(route.points));

