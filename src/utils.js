export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const formatDate = (date, fmt) => {

  if (!fmt) {
    const [, year, month, day, hour, min] = date.toISOString().match(/\d{2}(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    return `${day}/${month}/${year} ${hour}:${min}`;
  }

  switch (fmt) {
    case `MMM D`: return date.toDateString().slice(4, 10);
    case `YYYY-MM-DD`: return date.toISOString().slice(0, 10);
    default: throw new Exceception(`Invalid date format`);
  }
};
