import {formatDate_MMM_D, formatDate_YYYY_MM_DD} from '../utils.js';
import {getTripEventMarkup} from './trip-event.js';

export const getTripDaysMarkup = (route) => {
  const pointsByDay = new Map();
  route.points.forEach((it) => {
    const key = formatDate_YYYY_MM_DD(it.startTime);
    const collection = pointsByDay.get(key) || [];
    collection.push(it);
    pointsByDay.set(key, collection);
  });
  let dayCounter = 1;
  return `
    <ul class="trip-days">
      ${Array.from(pointsByDay).map(([day, eventList]) => `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayCounter++}</span>
          <time class="day__date" datetime="${day}">${formatDate_MMM_D(new Date(day))}</time>
        </div>

        <ul class="trip-events__list">
          ${eventList.map(getTripEventMarkup).join(``)}
        </ul>
      </li>`).join(``)}
    </ul>
  `;
};
