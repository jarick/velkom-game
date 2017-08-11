import {Container, Sprite} from 'pixi.js';
import game from '../stores/GameStore';


export default class ReceptButton extends Container {

  constructor(loader) {
    super();
    const sprite = new Sprite(loader.resources['game-book'].texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.position.x = 230;
    sprite.position.y = 750;
    this.sprite = sprite;
    this.interactive = true;
    this.buttonMode = true;
    const onClick = () => {
      game.items.forEach(_ => {
        if (_.id === game.scene) {
          if (_.recept) {
            $('#' + _.recept).click();
          }
        }
      });
    }
    this
      .on('mousedown', onClick)
      .on('touchstart', onClick)
    this.addChild(sprite);
  }

  set rotation(angle) {
    if (this.sprite) {
      this.sprite.rotation = angle;
    }
  }

}
