import {Container} from 'pixi.js';
import Item from './Item';
import ItemStore from '../stores/ItemsStore'
import {Map} from 'immutable';


export default class Items extends Container {

  constructor(items: Map<string, string>) {
    super();
    ItemStore.list.forEach(_ => {
      this.addChild(new Item(items.get(_.id), _.id, false, items.get(_.id + '-shadow')));
      this.addChild(new Item(items.get(_.id + '-active'), _.id, true, items.get(_.id + '-shadow')));
    });
    ItemStore.emitChange();
  }

}
