import {Container, Graphics, Sprite, Rectangle, Texture} from 'pixi.js';
import store, {WIDTH, HEIGHT, Y, OFFSET} from '../stores/TableStore';
import items from '../stores/ItemsStore';
import except, {ErrorType} from '../stores/ErrorStore';
import worldAction from '../actions/WorldAction';

export default class Place extends Container {

  getItem(index) {
    const item = store.items.filter(_ => _.number === index).first().item;
    if(item !== null && item !== 'bacon') {
      return item;
    } else {
      return null;
    }
  }

  constructor(index, loader) {
    super();
    const place = store.items.filter(_ => _.number === index).first();
    const data = this._update(index, place);
    let texture = loader.resources[place.file].texture;
    const sprite = new Sprite(texture);
    sprite.position.x = data.x;
    sprite.position.y = data.y;
    if (data.width > 0) {
      sprite.visible = this.getItem(index) === null;
      const x = texture.frame.width - data.width;
      const rect = new Rectangle(x, 0, data.width, data.height);
      sprite.texture = new Texture(texture, rect);
    } else {
      sprite.visible = false;
    }
    this.addChild(sprite);
    store.addChangeListener(() => {
      const data = this._update(index, place);
      const item = this.getItem(index);
      if (item === null) {
        texture = loader.resources[place.file].texture;
        this._changeSprite(sprite, texture, data);
      } else {
        sprite.visible = false;
        // texture = loader.resources[item + '-shadow'].texture;
        // this._changeSprite(sprite, texture, data);
      }
    });
    items.addChangeListener(update => {
      const item = this.getItem(index);;
      if (item !== null) {
        const data = this._update(index, place);
        if (update.drag === item || update.goHome.has(item)) {
          texture = loader.resources[place.file].texture;
          this._changeSprite(sprite, texture, data);
        } else {
          sprite.visible = false;
          // texture = loader.resources[item + '-shadow'].texture;
          // this._changeSprite(sprite, texture, data);
        }
      }
    })
    except.addChangeListener((_: ErrorType) => {
      const data = this._update(index, place);
      const item = this.getItem(index);
      if (item === null) {
        texture = loader.resources[place.file].texture;
        this._changeSprite(sprite, texture, data);
      } else {
        sprite.visible = false;
        // texture = loader.resources[item + '-shadow'].texture;
        // this._changeSprite(sprite, texture, data);
      }
    });
  }

  _changeSprite(sprite, texture, data) {
    sprite.position.x = data.x;
    if (data.width > 0) {
      sprite.visible = true;
      const x = texture.frame.width - data.width;
      const rect = new Rectangle(x, 0, data.width, data.height);
      sprite.texture = new Texture(texture, rect);
    } else {
      sprite.visible = false;
    }
  }

  _update(index, place) {
    const id = 'place-' + index;
    let x = store.getOffset(index - 1);
    let y = Y;
    let w = WIDTH;
    let h = HEIGHT;
    let posX = x;
    let posY = y + h / 2;
    if (x < store.overflow && x + WIDTH > OFFSET) {
      if (x + w > store.overflow) {
        w = store.overflow - x;
      } else if (x < OFFSET) {
        w = w + x - OFFSET;
        x = OFFSET;
      }
      if (place.enable) {
        worldAction.addPlace({
          id: id,
          x: x,
          y: y,
          posX: posX,
          posY: posY,
          width: w,
          height: h,
        });
      }
    } else {
      w = 0;
      if (place.enable) {
        worldAction.removePlace(id);
      }
    }
    return {
      id: id,
      x: x,
      y: y,
      width: w,
      height: h
    };
  }

}
