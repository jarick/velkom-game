import store, {Store, WIDTH, OFFSET} from '../stores/TableStore';
import items from '../stores/ItemsStore';


class TableAction {

  setWidth(count) {
    store.offset = OFFSET;
    store.width = store.getOffset(count) - (200 - WIDTH) - OFFSET;
    store.rightNav = store.overflow - store.offset < store.width;
    store.leftNav = store.offset < OFFSET;
    store.emitChange();
  }

  setOffset(offset: number) {
    store.rightNav = store.overflow - store.offset < store.width;
    store.leftNav = offset < OFFSET;
    store.offset = offset;
    store.emitChange();
    store.items.forEach(_ => {
      if (_.item) {
        items.emitSlide(_.item);
      }
    });
  }

}

export default new TableAction();
