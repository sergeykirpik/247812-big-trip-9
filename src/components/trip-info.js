import {route} from '../data.js';

export const getTripInfoMarkup = () => {
  return `
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route.title}</h1>

      <p class="trip-info__dates">${route.dates}</p>
    </div>
  `;
};
