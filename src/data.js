const getRandom = (n) => Math.floor(Math.random() * n);
const getRandomBool = () => [true, false][getRandom(2)];
const toHours = (mSec) => mSec * 1000 * 3600;
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

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
  [`check-in`]: `Check into hotel`,
  sightseeing: `Sightseeing at`,
  restaurant: `Restaurant`,
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
  startTime: new Date(),
  endTime: new Date(Date.now() + getRandom(toHours(5))),
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
});

export const tripEvent = getTripEvent();

const getOffersTotal = (te) => {
  Array.from(te.offers).reduce((acc, it) => acc + availableOffers[it].price, 0);
};

export const tripEventList = new Array(5).fill(``).map(getTripEvent);
tripEventList.getTotal = () => {
  return tripEventList.reduce((acc, it) => {
    return acc + it.price + getOffersTotal(it);
  }, 0);
};

