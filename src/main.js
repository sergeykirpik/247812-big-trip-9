import {getTripInfoMarkup} from './components/trip-info.js';

const render = (container, markup, place) => {
  container.insertAdjacentHTML(place, markup);
};

const tripMain = document.querySelector(`.trip-main`);
const tripInfoContainer = tripMain.querySelector(`.trip-info`);
render(tripInfoContainer, getTripInfoMarkup(), `afterBegin`);
