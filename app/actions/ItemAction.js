import store, {Item} from '../stores/ItemsStore';
import {Item as Place, Y, HEIGHT} from '../stores/TableStore';
import {Set} from 'immutable';

class ItemAction {

  overStart(id) {
    if (!store.goHome.has(id)) {
      store.over = id;
      store.emitChange();
    }
  }

  overEnd() {
    store.over = null;
    store.emitChange();
  }

  dragStart(id, event, parent) {
    if (!store.goHome.has(id)) {
      store.drag = id;
      store.dragging = false;
      store.dragEvent = event.data;
      store.dragPosition = event.data.getLocalPosition(parent);
      store.list = store.list.map(item => {
        if (item.id == id) {
          item.alpha = 0.5;
        } else {
          item.active = false;
        }
        return item;
      });
      store.emitChange();
    }
  }

  setInActive(id) {
    store.drag = null;
    store.dragEvent = null;
    store.dragPosition = null;
    store.list = store.list.map(_ => {
      _.active = (_.id == id) ? !_.active : false;
      return _;
    });
    store.emitChange();
  }

  dragEnd() {
    store.drag = null;
    store.dragEvent = null;
    store.dragPosition = null;
    store.list = store.list.map(_ => {
      _.alpha = 1;
      return _;
    });
    store.emitChange();
  }

  dragMove(id, parent) {
    if (store.drag == id) {
      store.dragging = true;
      store.list = store.list.map(item => {
        if (item.id == id) {
          item.active = true;
          const position = store.dragEvent.getLocalPosition(parent);
          const oldPosition = store.dragPosition;
          item.x += position.x - oldPosition.x;
          item.y += position.y - oldPosition.y;
          this._setScale(item);
        }
        return item;
      });
      store.dragPosition = store.dragEvent.getLocalPosition(parent);
      store.emitChange();
    }
  }

  setPosition(id, x, y) {
    store.list = store.list.map(item => {
      if (item.id == id) {
        item.posX = x;
        item.posY = y;
      }
      return item;
    });
    store.emitChange();
  }

  _setScale(item) {
     if (item.y >= Y - HEIGHT) {
       const y = (item.y <= Y) ? item.y : Y;
       item.scale = 1 + (y - Y + HEIGHT) / HEIGHT;
     } else {
       item.scale = 1;
     }
   }

  goHomeStart(id) {
    store.goHome = store.goHome.add(id);
    store.emitChange();
  }

  goHomeMove(id, x, y) {
    store.goHome = store.goHome.add(id);
    store.list = store.list.map(item => {
      if (item.id == id) {
        item.x = x;
        item.y = y;
        this._setScale(item);
      }
      return item;
    });
    store.emitChange();
  }

  goHomeEnd(id) {
    store.goHome = store.goHome.delete(id);
    store.list = store.list.map(item => {
      if (item.id == id) {
        item.x = item.posX;
        item.y = item.posY;
        this._setScale(item);
      }
      return item;
    });
    store.emitChange();
  }

  loadItems(list) {
    store.list = Set(list);
    store.emitChange();
  }

}

export default new ItemAction();
