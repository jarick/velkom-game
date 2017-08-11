import {Container, Text, Sprite, Texture, Graphics} from 'pixi.js';
import store from  '../stores/GameStore';
import StartScreenButton from './StartScreenButton';
import renderer from '../stores/RendererStore';


/**
 * Loads the adds the diagnostic image
 *
 * @exports Background
 * @extends Container
 */
export default class StartScreen extends Graphics {

  constructor(loader) {
    super();
    this.beginFill(0xE3E3E3);
    this.drawRect(0, 0, renderer.targetWidth, renderer.targetHeight);
    this.addChild(new StartScreenButton(loader));
    const tomato = new Sprite(loader.resources['main-tomato'].texture);
    tomato.position.x = 290;
    tomato.position.y = 713;
    this.addChild(tomato);
    const carrot = new Sprite(loader.resources['main-carrot'].texture);
    carrot.position.x = 1366;
    carrot.position.y = 262;
    this.addChild(carrot);
    const eggplant = new Sprite(loader.resources['main-eggplant'].texture);
    eggplant.position.x = 1230;
    eggplant.position.y = 0;
    this.addChild(eggplant);
    const redis = new Sprite(loader.resources['main-redis'].texture);
    redis.position.x = 900;
    redis.position.y = 0;
    this.addChild(redis);
    const bow = new Sprite(loader.resources['main-bow'].texture);
    bow.position.x = 1210;
    bow.position.y = 790;
    this.addChild(bow);
    const salad = new Sprite(loader.resources['main-salad'].texture);
    salad.position.x = -40;
    salad.position.y = 252;
    this.addChild(salad);
    const text = new Sprite(loader.resources['main-text'].texture);
    text.position.x = 487;
    text.position.y = 168;
    this.addChild(text);
    const txt = 'ВЕЛКОМ предлагает вам сыграть в увлекательную игру! \n Соберите нужные' +
      ' ингредиенты на столе и узнайте рецепт \n приготовления отменного блюда из бекона Велком!';
    const desc = new Text(txt, {
      font: '32px Arial',
      align: 'center',
      lineHeight: 50,
    });
    desc.position.x = 400;
    desc.position.y = 420;
    this.addChild(desc);
    store.addGameStartListener(() => {
      this.visible = false;
    });
  }

}
