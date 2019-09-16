export class EventManager {
  constructor() {
    this._events = [];
  }

  on(element, eventType, handler, capture = false) {
    this._events.push({element, eventType, handler, capture});
    return handler;
  }

  on2(element, eventType, handler, capture = false) {
    this.on(element, eventType, handler, capture);
    element.addEventListener(eventType, handler, capture);
  }

  off(evtHandler) {
    this._events.filter(({handler}) => handler === evtHandler).forEach((rec) => {
      const {element, eventType, handler, capture} = rec;
      element.removeEventListener(eventType, handler, capture);
    });
    this._events = this._events.filter(({handler}) => handler !== evtHandler);
  }

  attachEventHandlers() {
    console.log(`attach: ${this.constructor.name}`);
    this._events.forEach(({element, eventType, handler, capture}) => {
      element.addEventListener(eventType, handler, capture);
    });
  }

  detachEventHandlers() {
    console.log(`detach: ${this.constructor.name}`);
    this._events.forEach(({element, eventType, handler, capture}) => {
      element.removeEventListener(eventType, handler, capture);
    });
  }

}
