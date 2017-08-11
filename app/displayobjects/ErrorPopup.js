import {Text, Sprite, Container} from 'pixi.js'
import except from '../stores/ErrorStore';

export default class ErrorPopup extends Container {

  constructor(loader) {
    super();
    const img = new Sprite(loader.resources['game-error-popup'].texture);
    img.position.x = 315;
    img.position.y = 592;
    this.addChild(img);
    const text = new Text('эти ингредиенты', {
      font: "16px 'Open Sans', sans-serif",
    });
    text.position.x = 400;
    text.position.y = 615;
    this.addChild(text);
    const text2 = new Text('не подходят', {
      font: "16px 'Open Sans', sans-serif",
    });
    text2.position.x = 400;
    text2.position.y = 632;
    this.addChild(text2);
    this.visible = except.except;
    except.addChangeListener(_ => this.visible = _.except);
  }

}
