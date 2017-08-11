import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';
import BG from '../static/main/img/background-1.png'
import TOMATO from '../static/main/img/main-tomato.png';
import CARROT from '../static/main/img/main-carrot.png';
import EGGPLANT from '../static/main/img/main-eggplant.png';
import REDIS from '../static/main/img/main-redis.png';
import BOW from '../static/main/img/main-bow.png';
import SALAD from '../static/main/img/main-salad.png';
import TEXT from '../static/main/img/main-text.png';
import BUTTON from '../static/main/img/main-button.png';
import BUTTON_HOVER from '../static/main/img/main-button-hover.png';
import ARROW from '../static/main/img/game-arrow-3.png';
import BACON from '../static/main/img/game-bacon.png';
import PLACE_1 from '../static/main/img/game-place-1.png';
import PLACE_2 from '../static/main/img/game-place-2.png';
import PLACE_3 from '../static/main/img/game-place-3.png';
import PLACE_4 from '../static/main/img/game-place-4.png';
import PLACE_5 from '../static/main/img/game-place-5.png';
import PLACE_6 from '../static/main/img/game-place-6.png';
import PLACE_7 from '../static/main/img/game-place-7.png';
import PLACE_8 from '../static/main/img/game-place-8.png';
import PLACE_9 from '../static/main/img/game-place-9.png';
import ERROR_POPUP from '../static/main/img/game-error-popup.png';
import BOOK from '../static/main/img/game-book.png';
import EXIT from '../static/main/img/game-cross.png';
import PROGRESS from '../static/main/img/game-progress.png';
import NEXT from '../static/main/img/game-next.png';
import ITEM_EGGS from '../static/main/img/item-eggs.png';
import ITEM_EGGS_ACTIVE from '../static/main/img/item-eggs-active.png';
import ITEM_PASTA from '../static/main/img/item-pasta.png';
import ITEM_PASTA_ACTIVE from '../static/main/img/item-pasta-active.png';
import ITEM_POTATO from '../static/main/img/item-potato.png';
import ITEM_POTATO_ACTIVE from '../static/main/img/item-potato-active.png';
import ITEM_CHEESE from '../static/main/img/item-cheese.png';
import ITEM_CHEESE_ACTIVE from '../static/main/img/item-cheese-active.png';
import ITEM_MUSHROOMS from '../static/main/img/item-mushrooms.png';
import ITEM_MUSHROOMS_ACTIVE from '../static/main/img/item-mushrooms-active.png';
import ITEM_SALAD from  '../static/main/img/item-salad.png';
import ITEM_SALAD_ACTIVE from  '../static/main/img/item-salad-active.png';
import ITEM_TOMATO from '../static/main/img/item-tomato.png';
import ITEM_TOMATO_ACTIVE from '../static/main/img/item-tomato-active.png';
import ITEM_BREAD from '../static/main/img/item-bread.png';
import ITEM_BREAD_ACTIVE from '../static/main/img/item-bread-active.png';
import ITEM_BOW from '../static/main/img/item-bow.png';
import ITEM_BOW_ACTIVE from '../static/main/img/item-bow-active.png';
import ITEM_CARROT from '../static/main/img/item-carrots.png';
import ITEM_CARROT_ACTIVE from '../static/main/img/item-carrots-active.png';
import ITEM_RICE from '../static/main/img/item-rice.png';
import ITEM_RICE_ACTIVE from '../static/main/img/item-rice-active.png';
import ITEM_RICE_SHADOW from '../static/main/img/item-rice-shadown.png';
import ITEM_CHICKEN from '../static/main/img/item-chicken.png';
import ITEM_CHICKEN_ACTIVE from '../static/main/img/item-chicken-active.png';
import ITEM_AVOCADO from '../static/main/img/item-avocado.png';
import ITEM_AVOCADO_ACTIVE from '../static/main/img/item-avocado-active.png';
import ITEM_DOUGH from '../static/main/img/item-dough.png';
import ITEM_DOUGH_ACTIVE from '../static/main/img/item-dough-active.png';
import ITEM_EGGS_SHADOW from '../static/main/img/item-eggs-shadown.png';
import ITEM_PASTA_SHADOW from '../static/main/img/item-pasta-shadown.png';
import ITEM_POTATO_SHADOW from '../static/main/img/item-potato-shadown.png';
import ITEM_CHEESE_SHADOW from '../static/main/img/item-cheese-shadown.png';
import ITEM_MUSHROOMS_SHADOW from '../static/main/img/item-mushrooms-shadown.png';
import ITEM_SALAD_SHADOW from  '../static/main/img/item-salad-shadown.png';
import ITEM_TOMATO_SHADOW from '../static/main/img/item-tomato-shadown.png';
import ITEM_BREAD_SHADOW from '../static/main/img/item-bread-shadown.png';
import ITEM_BOW_SHADOW from '../static/main/img/item-bow-shadown.png'
import ITEM_CARROT_SHADOW from '../static/main/img/item-carrots-shadown.png';
import ITEM_CHICKEN_SHADOW from '../static/main/img/item-chicken-shadown.png';
import ITEM_AVOCADO_SHADOW from '../static/main/img/item-avocado-shadown.png';
import ITEM_DOUGH_SHADOW from '../static/main/img/item-dough-shadown.png';
import CURSOR_NOT_ACTIVE from '../static/main/img/game-not-active.cur';
import CURSOR_GRAB from '../static/main/img/game-grab.cur';
import CURSOR_CLICK from '../static/main/img/game-click.cur'
import { Set } from 'immutable';

export type Item = {
  id: string,
  file: string,
  load: boolean,
}

export type Store = {
  load: boolean,
  progress: number,
  items: Set<Item>,
  backgrounds: Set<Item>
}

class ResourcesStore extends EventEmitter {
  data: Store

  constructor(...args) {
    super(...args);

    this.data = {
      load: false,
      progress: 0,
      items: Set([
        {
          id: 'item-eggs',
          file: ITEM_EGGS,
          load: false,
        }, {
          id: 'item-pasta',
          file: ITEM_PASTA,
          load: false,
        }, {
          id: 'item-potato',
          file: ITEM_POTATO,
          load: false,
        }, {
          id: 'item-cheese',
          file: ITEM_CHEESE,
          load: false,
        }, {
          id: 'item-mushrooms',
          file: ITEM_MUSHROOMS,
          load: false,
        }, {
          id: 'item-salad',
          file: ITEM_SALAD,
          load: false,
        }, {
          id: 'item-tomato',
          file: ITEM_TOMATO,
          load: false,
        }, {
          id: 'item-bread',
          file: ITEM_BREAD,
          load: false,
        }, {
          id: 'item-bow',
          file: ITEM_BOW,
          load: false,
        }, {
          id: 'item-carrot',
          file: ITEM_CARROT,
          load: false,
        }, {
          id: 'item-rice',
          file: ITEM_RICE,
          load: false,
        }, {
          id: 'item-chicken',
          file: ITEM_CHICKEN,
          load: false,
        }, {
          id: 'item-avocado',
          file: ITEM_AVOCADO,
          load: false,
        }, {
          id: 'item-dough',
          file: ITEM_DOUGH,
          load: false,
        }, {
          id: 'item-eggs-active',
          file: ITEM_EGGS_ACTIVE,
          load: false,
        }, {
          id: 'item-pasta-active',
          file: ITEM_PASTA_ACTIVE,
          load: false,
        }, {
          id: 'item-potato-active',
          file: ITEM_POTATO_ACTIVE,
          load: false,
        }, {
          id: 'item-cheese-active',
          file: ITEM_CHEESE_ACTIVE,
          load: false,
        }, {
          id: 'item-mushrooms-active',
          file: ITEM_MUSHROOMS_ACTIVE,
          load: false,
        }, {
          id: 'item-salad-active',
          file: ITEM_SALAD_ACTIVE,
          load: false,
        }, {
          id: 'item-tomato-active',
          file: ITEM_TOMATO_ACTIVE,
          load: false,
        }, {
          id: 'item-bread-active',
          file: ITEM_BREAD_ACTIVE,
          load: false,
        }, {
          id: 'item-bow-active',
          file: ITEM_BOW_ACTIVE,
          load: false,
        }, {
          id: 'item-carrot-active',
          file: ITEM_CARROT_ACTIVE,
          load: false,
        }, {
          id: 'item-rice-active',
          file: ITEM_RICE_ACTIVE,
          load: false,
        }, {
          id: 'item-chicken-active',
          file: ITEM_CHICKEN_ACTIVE,
          load: false,
        }, {
          id: 'item-avocado-active',
          file: ITEM_AVOCADO_ACTIVE,
          load: false,
        }, {
          id: 'item-dough-active',
          file: ITEM_DOUGH_ACTIVE,
          load: false,
        }, {
          id: 'item-eggs-shadow',
          file: ITEM_EGGS_SHADOW,
          load: false,
        }, {
          id: 'item-pasta-shadow',
          file: ITEM_PASTA_SHADOW,
          load: false,
        }, {
          id: 'item-potato-shadow',
          file: ITEM_POTATO_SHADOW,
          load: false,
        }, {
          id: 'item-cheese-shadow',
          file: ITEM_CHEESE_SHADOW,
          load: false,
        }, {
          id: 'item-mushrooms-shadow',
          file: ITEM_MUSHROOMS_SHADOW,
          load: false,
        }, {
          id: 'item-salad-shadow',
          file: ITEM_SALAD_SHADOW,
          load: false,
        }, {
          id: 'item-tomato-shadow',
          file: ITEM_TOMATO_SHADOW,
          load: false,
        }, {
          id: 'item-bread-shadow',
          file: ITEM_BREAD_SHADOW,
          load: false,
        }, {
          id: 'item-bow-shadow',
          file: ITEM_BOW_SHADOW,
          load: false,
        }, {
          id: 'item-carrot-shadow',
          file: ITEM_CARROT_SHADOW,
          load: false,
        }, {
          id: 'item-rice-shadow',
          file: ITEM_RICE_SHADOW,
          load: false,
        }, {
          id: 'item-chicken-shadow',
          file: ITEM_CHICKEN_SHADOW,
          load: false,
        }, {
          id: 'item-avocado-shadow',
          file: ITEM_AVOCADO_SHADOW,
          load: false,
        }, {
          id: 'item-dough-shadow',
          file: ITEM_DOUGH_SHADOW,
          load: false,
        }
      ]),
      backgrounds: Set([
        {
          id: 'scene-1',
          file: BG,
          load: false
        }
      ]),
      main: Set([
        {
          id: 'main-tomato',
          file: TOMATO,
          load: false
        }, {
          id: 'main-carrot',
          file: CARROT,
          load: false
        }, {
          id: 'main-eggplant',
          file: EGGPLANT,
          load: false
        }, {
          id: 'main-redis',
          file: REDIS,
          load: false
        }, {
          id: 'main-bow',
          file: BOW,
          load: false
        }, {
          id: 'main-salad',
          file: SALAD,
          load: false
        }, {
          id: 'main-text',
          file: TEXT,
          load: false
        }, {
          id: 'main-button',
          file: BUTTON,
          load: false
        }, {
          id: 'main-button-hover',
          file: BUTTON_HOVER,
          load: false
        }
      ]),
      cursor: Set([
        {
          id: 'cursor-not-active',
          file: CURSOR_NOT_ACTIVE,
          load: false
        }, {
          id: 'cursor-grab',
          file: CURSOR_GRAB,
          load: false
        }, {
          id: 'cursor-click',
          file: CURSOR_CLICK,
          load: false
        },
      ]),
      game: Set([
        {
          id: 'game-arrow',
          file: ARROW,
          load: false
        }, {
          id: 'game-place-1',
          file: PLACE_1,
          load: false
        }, {
          id: 'game-place-2',
          file: PLACE_2,
          load: false
        }, {
          id: 'game-place-3',
          file: PLACE_3,
          load: false
        }, {
          id: 'game-place-4',
          file: PLACE_4,
          load: false
        }, {
          id: 'game-place-5',
          file: PLACE_5,
          load: false
        }, {
          id: 'game-place-6',
          file: PLACE_6,
          load: false
        }, {
          id: 'game-place-7',
          file: PLACE_7,
          load: false
        }, {
          id: 'game-place-8',
          file: PLACE_8,
          load: false
        }, {
          id: 'game-place-9',
          file: PLACE_9,
          load: false
        }, {
          id: 'game-bacon',
          file: BACON,
          load: false
        }, {
          id: 'game-book',
          file: BOOK,
          load: false
        }, {
          id: 'game-progress',
          file: PROGRESS,
          load: false
        }, {
          id: 'game-next',
          file: NEXT,
          load: false
        }, {
          id: 'game-exit',
          file: EXIT,
          load: false
        }, {
          id: 'game-error-popup',
          file: ERROR_POPUP,
          load: false
        }
      ])
    };
    this.setMaxListeners(1000);
  }

  get progress() :number {
    return this.data.progress;
  }

  set progress(value: number) {
    this.data.progress = value;
  }

  get load(): boolean {
    return this.data.load;
  }

  set load(value: boolean) {
    this.data.load = value;
  }

  get items(): Set<Item> {
    return this.data.items;
  }

  get main(): Set<Item> {
    return this.data.main;
  }

  get game(): Set<Item> {
    return this.data.game;
  }

  get cursor(): Set<Item> {
    return this.data.cursor;
  }

  get backgrounds(): Set<Item> {
    return this.data.backgrounds;
  }

  emitChange() {
    this.emit(constants.RESOURCE, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.RESOURCE, callback);
  }

  emitLoad(loader) {
    this.emit(constants.RESOURCE_LOAD, loader);
  }

  addLoadListener(callback) {
    this.on(constants.RESOURCE_LOAD, callback);
  }

}

export default new ResourcesStore();
