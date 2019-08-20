import {formatDate} from '../utils.js';
import {getTripEventMarkup} from './trip-event.js';

export const getTripDaysMarkup = (route) => {
  const pointsByDay = new Map();
  route.points.forEach((it) => {
    const key = formatDate(it.startTime, `YYYY-MM-DD`);
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
          <time class="day__date" datetime="${day}">${formatDate(new Date(day), `MMM D`)}</time>
        </div>

        <ul class="trip-events__list">
          ${eventList.map(getTripEventMarkup).join(``)}
        </ul>
      </li>`).join(``)}
    </ul>
  `;
};
