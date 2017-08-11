import {Container, Sprite} from 'pixi.js';

/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class Background extends Container {

  constructor(texture) {
    super();
    this.addChild(new Sprite(texture));
    this.position.x = 0;
    this.position.y = 0;
  }

}
