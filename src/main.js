import '../node_modules/flatpickr/dist/flatpickr.min.css';

import {route} from './data.js';
import {render} from './utils.js';
import {TripInfo} from './components/trip-info.js';
import {TripControls} from './components/trip-controls.js';
import {NewEventButton} from './components/new-event-btn.js';
import {TripController} from './controllers/trip-controller.js';

const tripMain = document.querySelector(`.trip-main`);

render(tripMain, new TripInfo(route));
render(tripMain, new TripControls());
render(tripMain, new NewEventButton());

const tripController = new TripController({
  container: document.querySelector(`main .page-body__container`),
  points: route.points,
});
tripController.init();
