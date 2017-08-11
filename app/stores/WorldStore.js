import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';
import { Set } from 'immutable';

export type Item = {
  x: number,
  y: number,
  width: number,
  height: number
}

export type Place = {
  x: number,
  y: number,
  posX: number,
  posY: number,
  width: number,
  height: number
}

export type InterSelect = {
  place: Place,
  item: Item
}

type State = {
  interSelect: Set<InterSelect>,
  items: Set<Item>,
  places: Set<Item>
}

class WorldStore extends EventEmitter {
  data: State
  constructor(...args) {
    super(...args);

    this.data = {
      interSelect: Set(),
      items: Set(),
      places: Set()
    };
    this.setMaxListeners(1000);
  }

  get places(): Set<Item> {
    return this.data.places;
  }

  set places(value: Set<Item>) {
    this.data.places = value;
  }

  get items(): Set<Item> {
    return this.data.items;
  }

  set items(value: Set<Item>) {
    this.data.items = value;
  }

  get interSelect(): Set<InterSelect> {
    return this.data.interSelect;
  }

  set interSelect(value: Set<InterSelect>) {
    this.data.interSelect = value;
  }

  emitChange() {
    this.emit(constants.TABLE, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.TABLE, callback);
  }
}

export default new WorldStore();
