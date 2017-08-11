import {Container} from 'pixi.js';
import resources from '../stores/ResourcesStore';
import game from '../stores/GameStore';
import Scenes from './Scenes';
import StartScreen from './StartScreen';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Game extends Container {

  constructor() {
    super();
    resources.addLoadListener((loader) => this._loadComplete(loader));
  }

  loadResources(loader) {
    resources.backgrounds.forEach(_ => loader.add(_.id, _.file));
    resources.items.forEach((_) => loader.add(_.id, _.file));
    resources.main.forEach((_) => loader.add(_.id, _.file));
    resources.game.forEach((_) => loader.add(_.id, _.file));
    resources.cursor.forEach((_) => loader.add(_.id, _.file));
  }

  _loadComplete(loader) {
    this.addChild(new StartScreen(loader));
    game.addGameStartListener(() => {
      this.addChild(new Scenes(loader));
    });
    game.addGameCompleteListener(() => {
      $('.game-over-hide').hide();
      $('.game-over-show').show();
    })
    game.addSceneCompleteListener(() => {
      game.items = game.items.map(_ => {
        if (_.id === game.scene) {
          _.complite = true;
        }
        return _;
      });
      const scene = game.items.filter(_ => !_.complite).first();
      if (scene) {
        game.scene = scene;
        this.removeChildren();
        this.addChild(new Scenes(loader));
      } else {
        game.scene = null;
        game.emitGameComplete();
      }
    })
  }

}
