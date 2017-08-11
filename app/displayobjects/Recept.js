import {Container} from 'pixi.js';
import Place from './Place';
import store from '../stores/ReceptStore';
import items from '../stores/ItemsStore';
import places from '../stores/TableStore';
import exceptAction from '../actions/ErrorAction';
import action from '../actions/GameAction';
import tableAction from '../actions/TableAction'
import WorldAction from '../actions/WorldAction'
import { removeAll } from 'tween.js';
import { Set } from 'immutable';

export default class Recept extends Container {

  constructor(scene: string, recept: string, loader) {
    super();
    this.destroy = false;
    const table = store.items.filter(_ => _.id === recept).first();
    let items = [];
    for (let i = 0; i < table.items.count(); i++) {
      const index = i + 1;
      const tbl = new Place(index, loader);
      this.addChild(tbl);
      items.push('place-' + index);
    }
    this._items = new Set(items);
    tableAction.setWidth(this._items.count());
    places.addChangeListener(_ => {
      if (!this.destroy) {
        const exists = _.items.filter(_ => !!_.item);
        let equals = exists.count() === table.items.count();
        let except = false;
        if (equals) {
          if (exists.every(_ => table.items.has(_.item))) {
            action.completeRecept(scene);
          } else {
            except = true;
          }
        }
        exceptAction.change(except);
      }
    });
  }

  destructor() {
    this.destroy = true;
    removeAll();
    this._items.forEach(it => {
      places.items = places.items.map(place => {
        if (place.id === it) {
          if (place.item) {
            items.list = items.list.map(item => {
              if (item.id === place.item) {
                item.x = place.posX;
                item.y = place.posY;
                item.posX = place.posX;
                item.posY = place.posY;
                item.scale = 1;
                place.posX = null;
                place.posY = null;
                place.item = null;
              }
              return item;
            });
          }
        }
        return place;
      });
      WorldAction.removePlace(it);
    });
    items.goHome = new Set();
    items.drag = null;
    items.dragging = false;
    items.dragEvent = null;
    items.dragEvent = null;
    items.emitChange();
    places.emitChange();
  }

}
