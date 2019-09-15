import {EventManager} from "./event-manager";

export const Position = {
  BEFORE_BEGIN: `beforeBegin`,
  AFTER_BEGIN: `afterBegin`,
  BEFORE_END: `beforeEnd`,
  AFTER_END: `afterEnd`
};

export const KeyCode = {
  ESC: 27,
  ENTER: 13,
};

const _attachEventHandlers = (component) => {
  if (component instanceof EventManager) {
    component.attachEventHandlers();
  }
};

const _detachEventHandlers = (component) => {
  if (component instanceof EventManager) {
    component.detachEventHandlers();
  }
};

export const render = (container, component, place = Position.BEFORE_END) => {
  switch (place) {
    case Position.BEFORE_BEGIN:
    case Position.AFTER_BEGIN:
    case Position.BEFORE_END:
    case Position.AFTER_END:
      container.insertAdjacentElement(place, component.element);
      _attachEventHandlers(component);
      break;
    default:
      throw new Error(`Invalid insertion point: ${place}`);
  }
};

export const unrender = (component) => {
  if (component) {
    _detachEventHandlers(component);
    component.element.remove();
    component.removeElement();
  }
};

export const rerender = (component, parentNode) => {
  if (component) {
    const container = parentNode || component.element.parentNode;
    unrender(component);
    render(container, component);
  }
};

export const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};

export const replaceComponent = (oldComponent, newComponent) => {
  oldComponent.element.parentNode.replaceChild(newComponent.element, oldComponent.element);
  _detachEventHandlers(oldComponent);
  _attachEventHandlers(newComponent);
};


export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export const groupBy = (arr, test) => {
  if (!test) {
    test = (a, b) => a === b;
  }
  const result = [];
  arr.forEach((e) => {
    const g = result[result.length - 1] || [];
    if (g.length > 0 && test(g[g.length - 1], e)) {
      g.push(e);
    } else {
      result.push([e]);
    }
  });
  return result;
};

export const die = (msg) => {
  throw new Error(msg);
};
