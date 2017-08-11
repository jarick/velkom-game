import {Container, Text, Graphics} from 'pixi.js';
import ResourcesStore from '../stores/ResourcesStore';
import RendererStore from '../stores/RendererStore';
import { Tween } from 'tween.js';
import renderer from '../stores/RendererStore';

export default class Loader extends Graphics {

  progress(procent) {
    this.beginFill(0xFFFFFF);
    this.drawRect(451, 417, 611, 11);
    this.beginFill(0x8F8F8F);
    this.drawRect(451, 417, 611/100 * procent, 11);
  }

  constructor(loader) {
    super();
    this.beginFill(0xE3E3E3);
    this.drawRect(0, 0, renderer.targetWidth, renderer.targetHeight);
    this.progress(0);
    const style = {
      font : "19px Arial",
      fill : '#010101',
      stroke : '#010101',
      align : 'center',
    };
    const word = 'Загрузка...'.split("").join(String.fromCharCode(8202))
    const text = new Text(word, style);
    text.position.x = 708;
    text.position.y = 465;
    this.text = text;
    this.addChild(this.text);

    this.position.x = RendererStore.get('stageCenter').x - this.width/2;
    this.position.y = RendererStore.get('stageCenter').y - this.height/2;
    RendererStore.addChangeListener((data) => {
      this.position.x = data.stageCenter.x - this.width/2;
      this.position.y = data.stageCenter.y - this.height/2;
    });
    ResourcesStore.addChangeListener(() => {
      this.progress(ResourcesStore.progress);
    });
    ResourcesStore.addLoadListener(() => this.visible = false);

    const self = this;
    const animate = () => {
      let data = {counter: 0};
      new Tween(data)
        .to({counter: 4}, 1000)
        .onUpdate(function() {
          const word = 'Загрузка' + '.'.repeat(this.counter|0);
          self.text.text = word.split("").join(String.fromCharCode(8202));
        })
        .onComplete(() => {
          const word = 'Загрузка...';
          this.text.text = word.split("").join(String.fromCharCode(8202));
          animate();
        })
        .start();
    }
    animate();
  }

}
