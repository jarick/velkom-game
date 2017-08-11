import EventEmitter from 'events';
import {constants} from '../constants/AppConstants';
import {Set} from 'immutable';

export type Recept = {
  number: number,
  complete: boolean,
  recept: string
}

export type Item = {
  id: string,
  complete: boolean,
  recepts: Set<Recept>,
  recept: ?string
}

export type Store = {
  scene: ?string,
  items: Set<Item>
};

class GameStore extends EventEmitter {
  data: Store

  constructor(...args) {
    super(...args);

    this.data = window.GAME_STORE;
    this.setMaxListeners(1000);
  }

  get complete(): boolean {
    return this.data.complete;
  }

  set complete(value: boolean) {
    this.data.complete = value;
  }

  get start(): boolean {
    return this.data.start;
  }

  set start(value: boolean) {
    this.data.start = value;
  }

  get scene(): string {
    return this.data.scene;
  }

  set scene(value: string) {
    this.data.scene = value;
  }

  get items(): Set<Item> {
    return this.data.items;
  }

  set items(value: Set<Item>) {
    this.data.items = value;
  }

  emitGameStart() {
    this.emit(constants.GAME_START, this.data);
  }

  addGameStartListener(callback) {
    this.on(constants.GAME_START, callback);
  }

  emitSceneStart() {
    this.emit(constants.QUEST_START, this.data);
  }

  addSceneStartListener(callback) {
    this.on(constants.QUEST_START, callback);
  }

  emitSceneComplete() {
    this.emit(constants.QUEST_COMPLETE, this.data);
  }

  addSceneCompleteListener(callback) {
    this.on(constants.QUEST_COMPLETE, callback);
  }

  emitReceptStart() {
    this.emit(constants.RECEPT_START, this.data);
  }

  addReceptStartListener(callback) {
    this.on(constants.RECEPT_START, callback);
  }

  emitReceptComplete() {
    this.emit(constants.RECEPT_COMPLETE, this.data);
  }

  addReceptCompleteListener(callback) {
    this.on(constants.RECEPT_COMPLETE, callback);
  }


  emitGameComplete() {
    this.emit(constants.GAME_COMPLETE, this.data);
  }

  addGameCompleteListener(callback) {
    this.on(constants.GAME_COMPLETE, callback);
  }

  emitReceptChange() {
    this.emit(constants.RECEPT_CHANGE, this.data);
  }

  addReceptChangeListener(callback) {
    this.on(constants.RECEPT_CHANGE, callback);
  }

  emitChange() {
    this.emit(constants.SCENE, this.data);
  }

  addChangeListener(callback) {
    this.on(constants.SCENE, callback);
  }

}

export default new GameStore();
