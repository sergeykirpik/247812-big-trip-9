import moment from "moment";

const MAX_DATE_INTERVAL = 10; // hours
const MAX_ROUTE_POINTS = 20;
const RANDOM_PHOTO_COUNT = 5;

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

const getRandomPhotos = () => new Array(RANDOM_PHOTO_COUNT).fill(``).map(getRandomPhoto);

export const destinationList = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const destinationData = new Map(destinationList.map((d) => [d, {description: getRandomDescription(), photos: getRandomPhotos()}]));

export class PointData {
  constructor({startTime, endTime, price, isFavorite, offers, type, destination, isNew}) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.price = price;
    this.isFavorite = isFavorite || false;
    this.offers = offers || new Set();
    this.type = type || `taxi`;
    this.destination = destination;
    this.isNew = isNew || false;
  }
  get total() {
    return getOffersTotal(this) + this.price;
  }
  get description() {
    return (destinationData.get(this.destination) || {}).description;
  }
  get photos() {
    return (destinationData.get(this.destination) || {}).photos || [];
  }
  get title() {
    return this.label + ` ` + this.destination;
  }
  get label() {
    return labels[this.type];
  }
}

const getTripEvent = () => new PointData({
  startTime: null,
  endTime: null,
  price: getRandom(999) + 20,
  isFavorite: getRandomBool(),
  offers: new Set(shuffle(Object.keys(availableOffers)).slice(0, getRandom(2 + 1))),
  type: transferType[getRandom(transferType.length)],
  destination: destinationList[getRandom(destinationList.length)],
});

const getTripEventList = (pointCount) => {
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

export const filterMethods = {
  everything: () => route.points,
  future: () => route.points.filter((it) => it.startTime > new Date()),
  past: () => route.points.filter((it) => it.endTime < new Date()),
};

export const menuData = [`table`, `stats`];

export const SortType = {
  event: (points) => points,
  time: (points) => points.slice()
    .sort((a, b) => getDuration(b) - getDuration(a)),
  price: (points) => points.slice()
    .sort((a, b) => b.price - a.price),
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
      moment(this.points[0].startTime).format(`MMM D`),
      moment(this.points[this.points.length - 1].endTime).format(`MMM D`),
    ].join(` &mdash; `);
  },
};
