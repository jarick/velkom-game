import game from '../stores/GameStore'
import {Container} from 'pixi.js';
import Scene from './Scene';
import {Map} from 'immutable';

export default class Scenes extends Container {

  constructor(loader) {
    super();
    const scenes = game.items.reduce((map, _) => {
      return map.set(_.id, new Scene(_, loader))
    }, Map());
    game.addSceneStartListener(_ => {
      this.removeChildren();
      this.addChild(scenes.get(_.scene));
    })
  }

}
