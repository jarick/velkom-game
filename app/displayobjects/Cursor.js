import {Container, Rectangle} from 'pixi.js';
import store from '../stores/CursorStore';

export default class Cursor extends Container {

  constructor(loader) {
    super();
    store.addChangeListener((data) => {
      let type;
      switch (data.type) {
        case 'NOT_ACTIVE':
          type = 'cursor-not-active';
          break;
        case 'GRAB':
          type = 'cursor-grab';
          break;
        case 'CLICK':
          type = 'cursor-click';
          break;
      }
      const url = loader.resources[type].url;
      document.getElementById('game').style.cursor = `url('${url}'), auto`;
    });
    store.emitChange();
  }

}
