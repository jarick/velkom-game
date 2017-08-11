import game, {Item} from '../stores/GameStore';
import action from '../actions/GameAction';
import resources from '../stores/ResourcesStore';
import table from  '../stores/TableStore';
import tableAction from '../actions/TableAction';
import {Container, Sprite, Point} from 'pixi.js';
import Background from './Background';
import Cursor from './Cursor';
import Items  from './Items';
import Recept from './Recept';
import ReceptButton from './ReceptButton';
import Progress from './Progress';
import Next from './Next';
import Exit from './Exit';
import ErrorPopup from './ErrorPopup';
import {Map} from 'immutable';
import { Tween, Easing } from 'tween.js';


export default class Scene extends Container {

  constructor(scene: Item, loader) {
    super();
    const bg = new Background(loader.resources[scene.id].texture);
    this.addChild(bg);
    const cursor = new Cursor(loader);
    this.addChild(cursor);
    const receptButton = new ReceptButton(loader);
    this.addChild(receptButton);
    const progress = new Progress(loader);
    this.addChild(progress);
    const next = new Next(loader);
    this.addChild(next);
    const exit = new Exit(loader);
    this.addChild(exit);
    const popup = new ErrorPopup(loader)
    this.addChild(popup);
    const items = resources.items.reduce((result, _) => {
      return result.set(_.id, loader.resources[_.id].texture);
    }, Map());
    const it = new Items(items);
    this.addChild(it);
    const leftArrow = new Sprite(loader.resources['game-arrow'].texture);
    leftArrow.position.x = 350;
    leftArrow.position.y = 779.5;
    leftArrow.interactive = true;
    leftArrow.buttonMode = true;
    leftArrow.visible = false;
    let leftInterval;
    const onLeftClick = () => {
      tableAction.setOffset(table.offset + 10);
      if (!leftInterval) {
        leftInterval = setInterval(() => {
          tableAction.setOffset(table.offset + 10);
        }, 10);
      }
    }
    const onLeftOut = () => {
      if (leftInterval) {
        clearInterval(leftInterval);
        leftInterval = null;
      }
    }
    leftArrow
      .on('mousedown', onLeftClick)
      .on('touchstart', onLeftClick)
      .on('mouseup', onLeftOut)
      .on('mouseupoutside', onLeftOut)
      .on('touchend', onLeftOut)
      .on('touchendoutside', onLeftOut);
    this.addChild(leftArrow);
    const rightArrow = new Sprite(loader.resources['game-arrow'].texture);
    rightArrow.rotation = 3.14;
    rightArrow.position.x = 1420;
    rightArrow.position.y = 834;
    rightArrow.interactive = true;
    rightArrow.buttonMode = true;
    rightArrow.visible = false;
    let rightInterval;
    const onRightClick = () => {
      tableAction.setOffset(table.offset - 10);
      if (!rightInterval) {
        rightInterval = setInterval(() => {
          tableAction.setOffset(table.offset - 10);
        }, 10);
      }
    }
    const onRightOut = () => {
      if (rightInterval) {
        clearInterval(rightInterval);
        rightInterval = null;
      }
    }
    rightArrow
      .on('mousedown', onRightClick)
      .on('touchstart', onRightClick)
      .on('mouseup', onRightOut)
      .on('mouseupoutside', onRightOut)
      .on('touchend', onRightOut)
      .on('touchendoutside', onRightOut);
    this.addChild(rightArrow);
    table.addChangeListener(data => {
      leftArrow.visible = data.leftNav;
      if (!data.leftNav) {
        if (leftInterval) {
          clearInterval(leftInterval);
          leftInterval = null;
        }
      }
      rightArrow.visible = data.rightNav;
      if (!data.rightNav) {
        if (rightInterval) {
          clearInterval(rightInterval);
          rightInterval = null;
        }
      }
    });
    game.addReceptChangeListener(data => {
      data.items.forEach(_ => {
        if (_.id === scene.id) {
          const newReceptId = action.nextRecept(scene.id);
          this._recept.destructor();
          this.removeChild(this._recept);
          if (newReceptId) {
            setTimeout(() => {
              this.animate(receptButton, scene.id, newReceptId, loader);
            }, 100);
          }
        }
      });
    });
    game.addReceptCompleteListener(data => {
      data.items.forEach(_ => {
        if (_.id === scene.id) {
          const oldReceptId = _.recept;
          const newReceptId = action.startRecept(scene.id);
          $('#' + oldReceptId + '-complete').click();
          $('#' + oldReceptId + '-complete-popup').tinyscrollbar();
          $('#' + oldReceptId + '-next').one('click', () => {
            this._recept.destructor();
            this.removeChild(this._recept);
            if (newReceptId) {
              setTimeout(() => {
                this.animate(receptButton, scene.id, newReceptId, loader);
              }, 100);
            }
          });
        }
      });
    });
    const receptId = action.startRecept(scene.id);
    this.animate(receptButton, scene.id, receptId, loader);
  }

  animate(receptButton, sceneId, newReceptId, loader) {
    let coords = {angle: -57.2958 / 10};
    new Tween(coords)
      .to({angle: 57.2958 / 10}, 100)
      .delay( 30 )
      .repeat( 4 )
      .yoyo( true )
      .onUpdate(function () {
        receptButton.rotation = this.angle / 57.2958;
      })
      .onComplete(() => {
        $('#' + newReceptId).click();
        $('#' + newReceptId + '-start').one('click', () => {
          this._recept = new Recept(sceneId, newReceptId, loader);
          this.addChildAt(this._recept, 3);
        });
      })
      .start();
  }

}
