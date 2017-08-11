import {Container, Sprite, Graphics, Text} from 'pixi.js';
import game from '../stores/GameStore';


export default class Progress extends Container {

  constructor(loader) {
    super();
    const graphics = new Graphics();
    this.addChild(graphics);
    const sprite = new Sprite(loader.resources['game-progress'].texture);
    sprite.position.x = 110;
    sprite.position.y = 20;
    this.addChild(sprite);
    const textSuccess = new Text('', {font : 'bold 27px Arial'});
    textSuccess.position.x = 345;
    textSuccess.position.y = 45;
    this.addChild(textSuccess);
    const textCount = new Text('', {font : 'bold 27px Arial'});
    textCount.position.x = 408;
    textCount.position.y = 45;
    this.addChild(textCount);
    const textFrom = new Text('из', {
      font : '18px Arial',
      dropShadowDistance: 0,
      fill : 0x3c3c3c,
    });
    textFrom.position.x = 382;
    textFrom.position.y = 54;
    this.addChild(textFrom);
    const textRecept = new Text('рецептов', {
      font : '18px Arial',
      dropShadowDistance: 0,
      fill : 0x3c3c3c,
    });
    textRecept.position.x = 448;

    textRecept.position.y = 54;
    this.addChild(textRecept);
    game.addReceptCompleteListener(data => {
      data.items.forEach(_ => {
      if (_.id === data.scene) {
          this._update(graphics, textSuccess, textCount, _.recepts);
        }
      });
    });
    game.items.forEach(_ => {
      if (_.id === game.scene) {
        this._update(graphics, textSuccess, textCount, _.recepts);
      }
    });
  }

  _update(graphics, textSuccess, textCount, items) {
    graphics.clear();
    graphics.beginFill(0xFFFFFF);
    graphics.drawRect(175, 40, 150, 33);
    const count = items.count();
    if (count > 0) {
      const success = items.reduce((result, _) => result + ((_.complete) ? 1 : 0), 0);
      graphics.beginFill(0xC4C4C4);
      graphics.drawRect(180, 45, 130 / count * success + 10, 23);
      textSuccess.text = (success > 9) ? success : " " + success;
      textCount.text = (count > 9) ? count : " " + count;
    }
  }

}
