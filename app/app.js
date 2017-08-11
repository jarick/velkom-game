/**
 * App.js
 *
 * The main entry point, appends PIXI to the DOM
 * and starts a render and animation loop
 *
 */

import './index.html';
import Renderer from './renderers/Renderer';
import App from './displayobjects/App';
import AnimationStore from './stores/AnimationStore';
import TWEEN from 'tween.js';
import WorldAction from './actions/WorldAction';
import {config} from '../package.json';

const box = document.getElementById('game')
const renderer = new Renderer(config.stageWidth, config.stageHeight);
window.renderer = renderer;
let app = new App();
box.appendChild(renderer.view);

AnimationStore.addChangeListener(() => {
  TWEEN.update();
  WorldAction.update();
});

renderer.addRenderable(app);
renderer.start();

if(module.hot) {
  module.hot.accept('./displayobjects/App', function () {
    renderer.removeRenderable(app);
    const NewApp = require('./displayobjects/App').default;
    app = new NewApp();
    renderer.addRenderable(app);
  });
}
