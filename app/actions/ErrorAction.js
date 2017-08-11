import store from '../stores/ErrorStore';

class ErrorAction {

  change(value: boolean) {
    store.except = value;
    store.emitChange();
  }

}

export default new ErrorAction();
