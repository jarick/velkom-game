import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';

export type ErrorType = {
  except: boolean
}

class ErrorStore extends EventEmitter {
  data: ErrorType

  constructor(...args) {
    super(...args);

    this.data = {
      except: false
    }
    this.setMaxListeners(1000);
  }

  get except(): boolean {
    return this.data.except;
  }

  set except(value: boolean) {
    this.data.except = value;
  }

  emitChange() {
    this.emit(constants.ERROR, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.ERROR, callback);
  }
}

export default new ErrorStore();
