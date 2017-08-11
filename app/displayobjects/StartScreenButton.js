import {Container, Sprite, Texture, Graphics} from 'pixi.js';
import action from '../actions/GameAction';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class StartScreenButton extends Sprite {

  constructor(loader) {
    super(loader.resources['main-button'].texture);
    this.position.x = 664;
    this.position.y = 610;
    this.interactive = true;
    this.buttonMode = true;
    const onClick = () => {
      const cb = () => action.startGame();
      if (window.start_game) {
        window.start_game(cb);
      } else {
        cb();
      }
    }
    this.on('mousedown', onClick);
    this.on('touchstart', onClick);
    this.on('mouseover', () => this.texture = loader.resources['main-button-hover'].texture)
    this.on('mouseout', () => this.texture = loader.resources['main-button'].texture)
  }

}
