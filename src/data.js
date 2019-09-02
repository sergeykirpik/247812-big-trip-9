import {formatDate} from './utils.js';

const MAX_DATE_INTERVAL = 10; // hours
const MAX_ROUTE_POINTS = 20;

const getRandom = (n) => Math.floor(Math.random() * n);
const getRandomBool = () => [true, false][getRandom(2)];
const hoursToMSec = (h) => h * 1000 * 3600;
const daysToMSec = (d) => hoursToMSec(24 * d);
const getRandomDate = () => new Date(Date.now() + getRandom(daysToMSec(6)) - getRandom(daysToMSec(3)));
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const getDuration = (tripEvent) => tripEvent.endTime.valueOf() - tripEvent.startTime.valueOf();

export const transferType = [
  `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`,
];

export const activityType = [
  `check-in`, `sightseeing`, `restaurant`,
];

export const labels = {
  taxi: `Taxi to`,
  bus: `Bus to`,
  train: `Train to`,
  ship: `Ship to`,
  transport: `Transport to`,
  drive: `Drive to`,
  flight: `Flight to`,
  [`check-in`]: `Check-in`,
  sightseeing: `Sightseeing in`,
  restaurant: `Restaurant in`,
};

export const destinationList = [
  `Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`
];

export const availableOffers = {
  luggage: {
    description: `Add luggage`,
    price: 30,
  },
  comfort: {
    description: `Switch to comfort class`,
    price: 100,
  },
  meal: {
    description: `Add meal`,
    price: 15,
  },
  seats: {
    description: `Choose seats`,
    price: 5,
  },
  train: {
    description: `Travel by train`,
    price: 40,
  },
};

const lorem = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];
const getRandomDescription = () => shuffle(lorem.slice()).slice(0, getRandom(2) + 1).join(``);
const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getTripEvent = () => ({
  startTime: null,
  endTime: null,
  price: getRandom(999) + 20,
  isFavorite: getRandomBool(),
  offers: new Set(shuffle(Object.keys(availableOffers)).slice(0, getRandom(2 + 1))),
  destDescription: getRandomDescription(),
  photos: new Array(5).fill(``).map(getRandomPhoto),
  type: transferType[getRandom(transferType.length)],
  destination: destinationList[getRandom(destinationList.length)],
  get title() {
    return labels[this.type] + ` ` + this.destination;
  },
  get label() {
    return labels[this.type];
  },
});

const getTripEventList = (pointCount) => {
  let startTime = getRandomDate();
  let dayNo = 0;
  let dayDate = ``;
  return new Array(pointCount).fill(``).map(() => {
    const it = getTripEvent();
    const d = formatDate(startTime, `YYYY-MM-DD`);
    if (d !== dayDate) {
      dayDate = d;
      dayNo++;
    }
    it.dayNo = dayNo;
    it.dayDate = dayDate;
    it.startTime = startTime;
    it.endTime = new Date(it.startTime.valueOf() + getRandom(hoursToMSec(MAX_DATE_INTERVAL)));
    startTime = it.endTime;
    return it;
  });
};

export const filterMethods = {
  everything: () => route.points,
  future: () => route.points.filter((it) => it.startTime > new Date()),
  past: () => route.points.filter((it) => it.endTime < new Date()),
};

export const menuData = [`table`, `stats`];

export const sortMethods = {
  event: (points) => points,
  time: (points) => points.slice().sort((a, b) => getDuration(a) - getDuration(b)),
  price: (points) => points.slice().sort((a, b) => a.price - b.price),
};

const getOffersTotal = (te) => Array.from(te.offers).reduce((acc, it) => acc + availableOffers[it].price, 0);

export const route = {
  points: getTripEventList(getRandom(MAX_ROUTE_POINTS)),
  get cost() {
    return this.points.reduce((acc, it) => acc + it.price + getOffersTotal(it), 0);
  },
  get title() {
    if (this.points.length === 0) {
      return ``;
    }
    if (this.points.length > 3) {
      return [
        this.points[0].destination,
        this.points[this.points.length - 1].destination
      ].join(` &mdash; ... &mdash; `);
    }
    return this.points.map((it) => it.destination).join(` &mdash; `);
  },
  get dates() {
    if (this.points.length === 0) {
      return ``;
    }
    return [
      formatDate(this.points[0].startTime, `MMM D`),
      formatDate(this.points[this.points.length - 1].endTime, `MMM D`),
    ].join(` &mdash; `);
  },
};
