import {Container} from 'pixi.js';
import RendererStore from '../stores/RendererStore.js';
import { RESIZE } from '../constants/AppConstants.js';
import {Point} from 'pixi.js'

/**
 * ScaledContainer
 *
 * A DisplayObjectContainer which attempts to scale and best-fit into the
 * window size dispatched from the RendererStrore
 *
 * @extends Container
 * @exports ScaledContainer
 */
export default class ScaledContainer extends Container {

  /**
   * Set target size
   * @return {null}
   */
  constructor() {
    super();
    RendererStore.addChangeListener(() => this.resizeHandler());
    this.resizeHandler();
  }

  /**
   * Scales and positions Container to best-fit to farget dimensions
   * @return {null}
   */
  resizeHandler() {
    const tw = RendererStore.get('targetWidth');
    const th = RendererStore.get('targetHeight');
    const rw = RendererStore.get('width');
    const rh = RendererStore.get('height');
    let scale = new Point(rw / tw, rh / th);
    this.scale = scale;
  }

}
