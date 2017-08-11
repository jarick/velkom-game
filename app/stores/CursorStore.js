import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';

export type CURSOR_STATE = 'NOT_ACTIVE' | 'GRAB' | 'CLICK';

export type CursorType = {
  type: CURSOR_STATE
}

class CursorStore extends EventEmitter {
  data: CursorType

  constructor(...args) {
    super(...args);

    this.data = {
      type: 'NOT_ACTIVE'
    }
    this.setMaxListeners(1000);
  }

  get type(): CURSOR_STATE {
    return this.data.type;
  }

  set type(value: CURSOR_STATE) {
    this.data.type = value;
  }

  emitChange() {
    this.emit(constants.CHANGE_CURSOR, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.CHANGE_CURSOR, callback);
  }
}

export default new CursorStore();
