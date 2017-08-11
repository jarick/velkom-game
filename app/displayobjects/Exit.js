import game from '../stores/GameStore';
import {Text, Sprite, Container} from 'pixi.js'

export default class Exit extends Container {

  constructor(loader) {
    super();
    this.interactive = true;
    this.buttonMode = true;
    const url = loader.resources['cursor-click'].url;
    this.defaultCursor = `url(${url}), auto`;
    const text = new Text('Закрыть игру', {
      font: "18px 'Open Sans', sans-serif",
    });
    text.position.x = 1448;
    text.position.y = 51;
    this.addChild(text);
    const cross = new Sprite(loader.resources['game-exit'].texture);
    cross.position.x = 1408;
    cross.position.y = 47;
    this.addChild(cross);
    const onClick = () => $(".game-exit")[0].click();
    this
      .on('mousedown', onClick)
      .on('touchstart', onClick)
  }

}
