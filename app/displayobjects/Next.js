import {Container, Sprite} from 'pixi.js';
import game from '../stores/GameStore';

export default class Next extends Container {

  constructor(loader) {
    super();
    const sprite = new Sprite(loader.resources['game-next'].texture);
    sprite.position.x = 1170;
    sprite.position.y = 31;
    this.interactive = true;
    this.buttonMode = true;
    const url = loader.resources['cursor-click'].url;
    this.defaultCursor = `url(${url}), auto`;
    const onClick = () => game.emitReceptChange();
    this
      .on('mousedown', onClick)
      .on('touchstart', onClick)
    this.addChild(sprite);
  }

}
