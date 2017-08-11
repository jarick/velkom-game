import ScaledContainer from './ScaledContainer.js';
import Loader from './Loader';
import Game from './Game';
import {loader} from 'pixi.js';
import action from '../actions/ResourcesAction';

/**
 * Main App Display Object
 *
 *
 * @exports App
 * @extends ScaledContainer
 */
export default class App extends ScaledContainer {

  constructor() {
    super();
    const loaderContainer = new Loader();
    this.addChild(loaderContainer);
    const game = new Game();
    this.addChild(game);
    if (loader.progress == 0) {
      game.loadResources(loader);
      loader.on('progress', () => action.progress(loader.progress));
      loader.load(() => action.load(loader));
    } else {
      action.load(loader);
    }
  }

}
