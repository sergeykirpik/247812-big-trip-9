export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`
};

export const render = (container, component, place) => {
  switch (place) {
    case Position.BEFORE_BEGIN:
    case Position.AFTER_BEGIN:
    case Position.BEFORE_END:
    case Position.AFTER_END:
      container.insertAdjacentElement(place, component.element);
      break;
    default:
      throw new Error(`Invalid insertion point: ${place}`);
  }
};

export const unrender = (component) => {
  if (component) {
    component.element.remove();
    component.removeElement();
  }
};

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};


export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const formatDate = (date, fmt) => {

  if (!fmt) {
    const [, year, month, day, hour, min] = date.toISOString().match(/\d{2}(\d{2})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
    return `${day}/${month}/${year} ${hour}:${min}`;
  }

  switch (fmt) {
    case `MMM D`: return date.toDateString().slice(4, 10);
    case `YYYY-MM-DD`: return date.toISOString().slice(0, 10);
    default: throw new Error(`Invalid date format`);
  }
};
