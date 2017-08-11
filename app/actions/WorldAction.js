import WorldStore, { Item } from '../stores/WorldStore';
import { Set } from 'immutable'

class WorldAction {

  update() {
    WorldStore.interSelect = WorldStore.places.reduce((interSelect, place) => {
      const iter = WorldStore.items.filter((item) => {
        return !(
          item.x + item.width < place.x ||
          place.x + place.width < item.x ||
          place.y > item.y + item.height ||
          item.y > place.y + place.height
        );
      }).map(x => Object({
        place: place,
        item: x
      }));
      return interSelect.merge(iter);
    }, Set());
  }

  addItem(data: Item) {
    if (WorldStore.items.some(x => x.id === data.id)) {
      WorldStore.items = WorldStore.items.map(x => (x.id === data.id) ? data : x)
    } else {
      WorldStore.items = WorldStore.items.add(data);
    }
    WorldStore.emitChange();
  }

  removeItem(id: string) {
    WorldStore.items = WorldStore.items.filter(x => x.id !== id);
    WorldStore.emitChange();
  }

  addPlace(data: Item) {
    if (WorldStore.places.some(x => x.id === data.id)) {
      WorldStore.places = WorldStore.places.map(x => (x.id === data.id) ? data : x)
    } else {
      WorldStore.places = WorldStore.places.add(data);
    }
    WorldStore.emitChange();
  }

  removePlace(id: string) {
    WorldStore.places = WorldStore.places.filter(x => x.id !== id);
    WorldStore.emitChange();
  }

}

export default new WorldAction();
