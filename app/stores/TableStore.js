import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';
import {Set} from 'immutable';

export const WIDTH = 150;
export const HEIGHT = 100;
export const Y = 750;
export const OFFSET = 420;

export type Item = {
  id: string,
  number: number,
  file: string,
  item: ?string,
  posX: ?number,
  posY: ?number,
  width: number,
  height: number,
  enable: boolean
}

export type Store = {
  offset: number,
  width: number,
  overflow: number,
  leftNav: boolean,
  rightNav: boolean,
  items: Set<Item>
}

class TableStore extends EventEmitter {

  constructor(...args) {
    super(...args);

    this.data = {
      offset: OFFSET,
      width: 2360,
      overflow: 1370,
      leftNav: true,
      rightNav: false,
      items: Set([
        {
          id: 'place-1',
          number: 1,
          enable: false,
          file: 'game-bacon',
          file_shadow: 'game-place-shadow',
          item: 'bacon',
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-2',
          file: 'game-place-2',
          file_shadow: 'game-place-shadow',
          enable: true,
          number: 2,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-3',
          number: 3,
          file: 'game-place-3',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
        }, {
          id: 'place-4',
          number: 4,
          file: 'game-place-4',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-5',
          number: 5,
          file: 'game-place-5',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-6',
          number: 6,
          file: 'game-place-6',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-7',
          number: 7,
          file: 'game-place-7',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-8',
          number: 8,
          file: 'game-place-8',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }, {
          id: 'place-9',
          number: 9,
          file: 'game-place-9',
          file_shadow: 'game-place-shadow',
          enable: true,
          item: null,
          posX: null,
          posY: null,
          width: 150,
          height: 100
        }
      ]),
    };
    this.setMaxListeners(1000);
  }

  get offset(): number {
    return this.data.offset;
  }

  set offset(value: number) {
    this.data.offset = value;
  }

  get width(): number {
    return this.data.width;
  }

  set width(value: number) {
    this.data.width = value;
  }

  get overflow(): number {
    return this.data.overflow;
  }

  set overflow(value: number) {
    this.data.overflow = value;
  }

  get leftNav(): boolean {
    return this.data.leftNav;
  }

  set leftNav(value: boolean) {
    this.data.leftNav = value;
  }

  get rightNav(): boolean {
    return this.data.rightNav;
  }

  set rightNav(value: boolean) {
    this.data.rightNav = value;
  }

  get items(): Set<Item> {
    return this.data.items;
  }

  set items(value: Set<Item>) {
    this.data.items = value;
  }

  getOffset(index: number) {
    return this.data.offset + (200 * index);
  }

  emitComplete() {
    this.emit(constants.TABLE_SUCCESS, this.data);
  }

  addCompleteListener(callback: (data: Store) => null) {
    this.on(constants.TABLE_SUCCESS, callback);
  }

  emitChange() {
    this.emit(constants.TABLE, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.TABLE, callback);
  }
}

export default new TableStore();
