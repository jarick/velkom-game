import { Tween } from 'tween.js';
import { Sprite, Container, Point, Rectangle, Texture } from 'pixi.js';
import ItemAction from '../actions/ItemAction';
import WorldAction from '../actions/WorldAction';
import ItemStore, { Store } from '../stores/ItemsStore';
import TableStore, {OFFSET, Y} from '../stores/TableStore';
import WorldStore from '../stores/WorldStore';
import cursor from '../stores/CursorStore';


export default class Item extends Container {

  constructor(file, id, active, fileShadow) {
    super();
    this._file = file;
    this._shadow = false;
    this._fileWithoutShadow = file;
    this._fileWithShadow = fileShadow;
    this._sprite = new Sprite(file);
    this.addChild(this._sprite);
    this._id = id;
    this._active = active;
    this.interactive = true;
    this._modifyTexture = false;
    this._eventsHandler();
    this._update();
  }

  _eventsHandler() {
    const onDragStart = (event) => {
      ItemAction.dragStart(this._id, event, this.parent);
    }
    const onDragEnd = () => {
      ItemAction.dragEnd(this._id);
    }
    const onOverStart = () => {
      ItemAction.overStart(this._id);
    }
    const onOverEnd = () => {
      ItemAction.overEnd();
    }
    const onDragMove = () => {
      ItemAction.dragMove(this._id, this.parent);
    }
    document.body.onmouseup = onDragEnd;
    this
      // events for drag start
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      // events for drag end
      .on('mouseup', () => {
        if (!ItemStore.dragging) {
          ItemAction.setInActive(this._id);
        }
        onDragEnd();
      })
      .on('mouseupoutside', onDragEnd)
      .on('mouseover', onOverStart)
      .on('mouseout', onOverEnd)
      .on('touchend', () => {
        if (!ItemStore.dragging) {
          ItemAction.setInActive(this._id);
        }
        onDragEnd();
      })
      .on('touchendoutside', onDragEnd)
      // events for drag move
      .on('mousemove', onDragMove)
      .on('touchmove', onDragMove);
    ItemStore.addSlideListener((id) => {
      if (id === this._id && !ItemStore.goHome.has(id) && !ItemStore.drag) {
        ItemStore.list = ItemStore.list.map(_ => {
          if (_.id === id) {
            TableStore.items.forEach(table => {
              if (table.item === id) {
                const x = TableStore.getOffset(table.number - 1);
                 _.x = x;
                 _.posX = x;
                 this.position.x = x;
                 this._crop(_);
              }
            });
          }
          return _;
        });
      }
    });

  }

  _update() {
    ItemStore.addChangeListener((data: Store) => {
      let type;
      if (data.drag) {
        type = 'GRAB';
      } else {
        if (data.over) {
          type = 'CLICK';
        } else {
          type = 'NOT_ACTIVE';
        }
      }
      if (cursor.type !== type) {
        cursor.type = type;
        cursor.emitChange();
      }
      data.list.forEach((item) => {
        if (item.id == this._id) {
          this._setShadow(data, item);
          this._subscribe(item);
          if (!data.goHome.has(item.id) && !data.drag && (item.x != item.posX || item.y != item.posY)) {
            this._returnItem(item);
            this._interSelect(item);
          }
          if (data.drag === item.id) {
            this._recoveryCrop(item);
          } else {
            this._crop(item);
          }
        }
      });
    });
  }

  _setShadow(data, item) {
    let shadow = false;
    this._file = this._fileWithoutShadow;
    const place = TableStore.items.filter(_ => _.item === item.id).first();
    if(place) {
      if (!(data.drag === item.id || data.goHome.has(item.id))) {
        shadow = true;
        this._file = this._fileWithShadow;
      }
    }
    if (this._shadow !== shadow) {
      this._sprite.texture = new Texture(this._file);
    }
    this._shadow = shadow;
  }

  _subscribe(item) {
    this.position.x = item.x;
    this.position.y = item.y;
    this.alpha = item.alpha;
    this.scale = new Point(item.scale / 2, item.scale / 2);
    if (this._active) {
      this.visible = item.show && item.active;
      if (this.visible) {
        WorldAction.addItem({
          id: item.id,
          x: this.position.x,
          y: this.position.y,
          width: this.width,
          height: this.height
        });
      } else {
        WorldAction.removeItem(item.id);
      }
    } else {
      this.visible = item.show && !item.active
    }
  }

  _returnItem(item) {
    const place = TableStore.items.filter(_ => _.item === item.id).first();
    if (place) {
      const posX = place.posX;
      const posY = place.posY;
      const item = place.item;
      TableStore.items = TableStore.items.map(_ => {
        if (_.id === place.id) {
          _.posX = null;
          _.posY = null;
          _.item = null;
        }
        return _;
      });
      TableStore.emitChange();
      ItemStore.list = ItemStore.list.map(_ => {
        if(_.id === item) {
          _.posX = posX;
          _.posY = posY;
          this.goHome(_.x, _.y, _.posX, _.posY);
        }
        return _;
      });
    }
  }

  _interSelect(item) {
    const interSelect = WorldStore.interSelect
      .filter(_ => {
        return _.item.id === item.id
      })
      .first();
    if (interSelect) {
      TableStore.items = TableStore.items.map(_ => {
        if (_.id === interSelect.place.id) {
          if (_.item) {
            ItemStore.list = ItemStore.list.map(x => {
              if(x.id === _.item) {
                x.posX = _.posX;
                x.posY = _.posY;
              }
              return x;
            });
            ItemStore.list.filter(x => x.id === _.id).forEach(_ => {
              this.goHome(_.x, _.y, _.posX, _.posY);
            });
          }
          _.posX = item.posX;
          _.posY = item.posY;
          _.item = item.id;
        }
        return _;
      });
      item.posX = interSelect.place.posX;
      item.posY = interSelect.place.posY - interSelect.place.height / 2;
      ItemStore.list = ItemStore.list.map(_ => {
        if(_.id === item.id) {
          _.posX = item.posX;
          _.posY = item.posY;
        }
        return _;
      });
      this.goHome(item.x, item.y, item.posX, item.posY);
      TableStore.emitChange();
    } else {
      this.goHome(item.x, item.y, item.posX, item.posY);
    }
  }

  _cropRight(item) {
    const exists = !TableStore.items
      .filter(_ => !!_.item)
      .filter(_ => _.item === item.id)
      .isEmpty();
    if (exists) {
      if (item.x >= TableStore.overflow) {
        this.visible = false;
      } else {
        this.visible = true;
        const w = (TableStore.overflow - item.x) / item.scale / 2;
        const rect = new Rectangle(0, 0, w, this._file.frame.height);
        const texture = new Texture(this._file, rect);
        this._sprite.texture = texture;
        this._modifyTexture = true;
      }
    }
  }

  _cropLeft(item) {
    const exists = !TableStore.items
      .filter(_ => !!_.item)
      .filter(_ => _.item === item.id)
      .isEmpty();
    const textureTmp = new Texture(this._file);
    const maxW = textureTmp.frame.width * item.scale / 2;
    if (exists) {
      if (item.x + 150 <= OFFSET) {
        this.visible = false;
      } else {
        this.visible = true;
        const w = (maxW - OFFSET + item.x) / (item.scale / 2);
        const x = textureTmp.frame.width - w;
        const rect = new Rectangle(x, 0, w, this._file.frame.height);
        const texture = new Texture(this._file, rect);
        this._sprite.position.x = x;
        this._sprite.texture = texture;
        this._modifyTexture = true;
      }
    }
  }

  _crop(item) {
    if (item.y >= Y) {
      if (item.posX + (this._file.frame.width * item.scale / 2) > TableStore.overflow) {
        if (item.x + (this._file.frame.width * item.scale / 2) > TableStore.overflow) {
          this._cropRight(item);
        }
      } else if (item.posX < OFFSET && item.x < OFFSET) {
        this._cropLeft(item);
      } else {
        this._recoveryCrop();
      }
    } else {
      this._recoveryCrop();
    }
  }

  _recoveryCrop() {
    if (this._modifyTexture) {
      const texture = new Texture(this._file);
      this._sprite.texture = texture;
      this._sprite.position.x = 0;
      this._modifyTexture = false;
    }
  }

  goHome(x, y, posX, posY) {
    ItemAction.goHomeStart(this._id);
    let coords = { x: x, y: y };
    const self = this;
    new Tween(coords)
      .to({ x: posX, y: posY }, 300)
      .onUpdate(function(){
        ItemAction.goHomeMove(self._id, this.x, this.y);
      })
      .onComplete(() => ItemAction.goHomeEnd(self._id))
      .start();
  }

}
