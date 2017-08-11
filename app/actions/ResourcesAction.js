import store from '../stores/ResourcesStore';

class ResourcesAction {

  load(loader) {
    store.load = true;
    store.emitChange();
    store.emitLoad(loader);
  }

  progress(procent) {
    store.progress = procent;
    store.emitChange();
  }

}

export default new ResourcesAction();
