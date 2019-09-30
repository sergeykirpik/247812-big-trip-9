import moment from "moment";
import {PointModel} from "./point-model";
import {dataProvider} from "./data-provider";

const MAX_DATE_INTERVAL = 10; // hours
export const MAX_ROUTE_POINTS = 20;

export const getRandom = (n) => Math.floor(Math.random() * n);
const getRandomBool = () => [true, false][getRandom(2)];
const hoursToMSec = (h) => h * 1000 * 3600;
const daysToMSec = (d) => hoursToMSec(24 * d);
const getRandomDate = () => new Date(Date.now() + getRandom(daysToMSec(6)) - getRandom(daysToMSec(3)));
const shuffle = (array) => array.sort(() => Math.random() - 0.5);
const getDuration = (tripEvent) => tripEvent.endTime.valueOf() - tripEvent.startTime.valueOf();

export const TransferType = [
  `taxi`, `bus`, `train`, `flight`, `ship`, `transport`, `drive`
];

export const ActivityType = [
  `check-in`, `sightseeing`, `restaurant`,
];

export const PointType = [
  ...TransferType, ...ActivityType
];

export const labels = {
  taxi: `Taxi to`,
  bus: `Bus to`,
  train: `Train to`,
  ship: `Ship to`,
  transport: `Transport to`,
  drive: `Drive to`,
  flight: `Flight to`,
  [`check-in`]: `Check-in in`,
  sightseeing: `Sightseeing in`,
  restaurant: `Restaurant in`,
};

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

const getTripEvent = () => new PointModel({
  startTime: null,
  endTime: null,
  price: getRandom(999) + 20,
  isFavorite: getRandomBool(),
  offers: new Set(shuffle(Object.keys(availableOffers)).slice(0, getRandom(2 + 1))),
  type: PointType[getRandom(PointType.length)],
  destination: dataProvider.destinations[getRandom(dataProvider.destinations.length)],
});

export const getTripEventList = (pointCount) => {
  let startTime = getRandomDate();
  return new Array(pointCount).fill(``).map(() => {
    const it = getTripEvent();
    it.dayDate = () => moment(it.startTime).format(`YYYY-MM-DD`);
    it.startTime = startTime;
    it.endTime = new Date(it.startTime.valueOf() + getRandom(hoursToMSec(MAX_DATE_INTERVAL)));
    startTime = it.endTime;
    return it;
  });
};

export const FilterType = {
  everything: (data) => data,
  future: (data) => data.filter((it) => it.startTime > new Date()),
  past: (data) => data.filter((it) => it.endTime < new Date()),
};

export const menuData = [`table`, `stats`];

export const SortType = {
  event: (points) => points,
  time: (points) => points.slice()
    .sort((a, b) => getDuration(b) - getDuration(a)),
  price: (points) => points.slice()
    .sort((a, b) => b.price - a.price),
};

