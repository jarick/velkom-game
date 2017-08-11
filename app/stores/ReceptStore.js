import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';
import {Set} from 'immutable';

export type Item = {
  id: string,
  open: boolean,
  items: Set<string>
}

export type Store = {
  items: Set<Item>
}

class ReceptStore extends EventEmitter {
  data: Store

  constructor(...args) {
    super(...args);

    this.data = window.RECEPT_STORE;
    this.setMaxListeners(1000);
  }

  get items(): Set<Item> {
    return this.data.items;
  }

  set items(value: Set<Item>) {
    this.data.items = value;
  }

  emitChange() {
    this.emit(constants.SCENE, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.SCENE, callback);
  }
}

export default new ReceptStore();
