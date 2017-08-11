import EventEmitter from 'events';
import { constants } from '../constants/AppConstants';
import { Set } from 'immutable'

export type Item = {
  id: string,
  active: boolean,
  show: boolean,
  alpha: number,
  scale: number,
  x: number,
  y: number,
  posX: number,
  posY: number
}

export type Store = {
  drag: ?string,
  over: ?string,
  dragging: boolean,
  dragEvent: ?Object,
  dragPosition: ?Object,
  goHome: Set<string>,
  list: Set<Item>
}

class ItemsStore extends EventEmitter {
  data: Store
  constructor(...args) {
    super(...args);

    this.data = {
      drag: null,
      over: null,
      dragging: false,
      dragEvent: null,
      dragPosition: null,
      goHome: new Set(),
      list: new Set([
        {
          id: 'item-eggs',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 326,
          y: 196,
          posX: 326,
          posY: 196,
        }, {
          id: 'item-pasta',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 980,
          y: 192,
          posX: 980,
          posY: 192,
        }, {
          id: 'item-potato',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 1020,
          y: 573,
          posX: 1020,
          posY: 573,
        }, {
          id: 'item-cheese',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 528,
          y: 367,
          posX: 528,
          posY: 367,
        }, {
          id: 'item-mushrooms',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 310,
          y: 370,
          posX: 310,
          posY: 370,
        }, {
          id: 'item-salad',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 370,
          y: 361,
          posX: 370,
          posY: 361,
        }, {
          id: 'item-tomato',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 395,
          y: 369,
          posX: 395,
          posY: 369,
        }, {
          id: 'item-bread',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 1140,
          y: 388,
          posX: 1140,
          posY: 388,
        }, {
          id: 'item-bow',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 1062,
          y: 521,
          posX: 1062,
          posY: 521,
        }, {
          id: 'item-carrot',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 992,
          y: 525,
          posX: 992,
          posY: 525,
        }, {
          id: 'item-rice',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 658,
          y: 195,
          posX: 658,
          posY: 195,
        }, {
          id: 'item-chicken',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 475,
          y: 255,
          posX: 475,
          posY: 255,
        }, {
          id: 'item-avocado',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 377,
          y: 257,
          posX: 377,
          posY: 257,
        }, {
          id: 'item-dough',
          active: false,
          show: true,
          alpha: 1,
          scale: 1,
          x: 486,
          y: 192,
          posX: 486,
          posY: 192,
        }
      ]),
    };
    this.setMaxListeners(1000);
  }

  get drag(): ?string {
    return this.data.drag;
  }

  set drag(value: ?string) {
    this.data.drag = value;
  }

  get over(): ?string {
    return this.data.over;
  }

  set over(value: ?string) {
    this.data.over = value;
  }

  get dragging(): boolean {
    return this.data.dragging
  }

  set dragging(value: boolean) {
    this.data.dragging = value;
  }

  get dragEvent(): ?Object {
    return this.data.dragEvent;
  }

  set dragEvent(value: ?Object) {
    this.data.dragEvent = value;
  }

  get dragPosition(): ?Object {
    return this.data.dragPosition
  }

  set dragPosition(value: ?Object) {
    this.data.dragPosition = value;
  }

  get goHome(): Set<string> {
    return this.data.goHome;
  }

  set goHome(value: Set<string>) {
    this.data.goHome = value;
  }

  get list(): Set<Item> {
    return this.data.list;
  }

  set list(value: Set<Item>) {
    this.data.list = value;
  }

  emitChange() {
    this.emit(constants.CHANGE, this.data);
  }

  addChangeListener(callback: (data: Store) => null) {
    this.on(constants.CHANGE, callback);
  }

  emitSlide(id) {
    this.emit(constants.ITEM_SLIDE, id);
  }

  addSlideListener(callback) {
    this.on(constants.ITEM_SLIDE, callback);
  }
}

export default new ItemsStore();
