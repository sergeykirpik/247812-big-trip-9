class EventEmmiter {
  constructor() {
    this._subsribers = [];
  }

  subscribe(callback) {
    this._subsribers.push(callback);
  }

  unsubscribe(callback) {
    const idx = this._subsribers.findIndex((it) => it === callback);
    this._subsribers.splice(idx, 1);
  }

  emit(evt) {
    this._notifyAll(evt);
  }

  on(evtTarget, evtType, callback) {
    this._subsribers.push({evtTarget, evtType, callback});
  }

  _notifyAll(evt) {
    this._subsribers = this._subsribers.filter((it) => it.callback);
    this._subsribers.forEach((it) => {
      if ((it.evtTarget === evt.target || it.evtTarget === null) && (it.evtType === evt.type)) {
        it.callback(evt);
      }
    });
  }

}

export const eventEmmiter = new EventEmmiter();
