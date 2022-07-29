import { ROTATE_DIRECTION_2_TRANSFORM } from '../setup/index.js';
import { setTransition } from '../../utils.js';

export default class Block {
  //#region 属性
  _position = null; // 块的相对位置；可以随视角转动和旋转某一层而改变；其内部有一个用三个层名表示的数组
  _origPosition = null; // 保存初始的相对位置，重置时调用
  // HTML元素
  _element = null;

  get position() {
    return this._position;
  }
  set position(position) {
    if (position) {
      this._position = position;
    } else {
      console.log('设置失败，块的位置未提供');
    }
  }

  get element() {
    return this._element;
  }

  set element(element) {
    if (element) {
      this._element = element;
    } else {
      console.log(`Reference Error: 当前块的视图不存在`);
    }
  }

  get origPosition() {
    if (origPosition) {
      return Object.assign({}, this._origPosition);
    }
  }

  set origPosition(origPosition) {
    this._origPosition = Object.assign({}, origPosition);
  }
  //#endregion

  constructor(element, position) {
    this.element = element;
    this.position = position;
    this.initPosition();
  }

  // 初始化
  initPosition(position) {
    this.origPosition = Object.assign({}, position);
  }
  // 重置
  resetPosition() {
    this.position.setPosition(this.origPosition);
  }

  //#region 过渡效果
  enableTransition(blockTransition) {
    setTransition(this.element, blockTransition);
  }
  disableTransition() {
    setTransition(this.element);
  }
  //#endregion

  // 判断当前块是否在旋转层上
  isBlockInRotatingLayer(rotateLayer) {
    return this.position.isBlockInRotatingLayer(rotateLayer);
  }

  // transform 属性
  getTransform() {
    return window.getComputedStyle(this.element).transform;
  }
  setTransform(transform) {
    this.element.style.transform = transform;
  }
  // transform-origin 属性
  getTransformOrigin() {
    return window.getComputedStyle(this.element).transformOrigin;
  }
  setTransformOrigin(transformOrigin) {
    this.element.style.transformOrigin = transformOrigin;
  }

  // 根据当前位置和旋转方向，确定3d变换参数
  rotate(rotateDirectionKey) {
    // 通过 Promise 设置异步过程，保证执行顺序
    Promise.resolve()
      // 启用过渡效果
      .then(() => {
        this.enableTransition('transform 0.5s linear');
      })
      // 旋转前先设置原点
      .then(() => {
        // const transformOrigin = this.getTransformOrigin();
        // rotateDirectionKey;
        // this.setTransformOrigin(``);
      })
      .then(() => {
        const rotate = ROTATE_DIRECTION_2_TRANSFORM[rotateDirectionKey];
        // 获取原始的 transform 参数，返回值是 matrix3d() 的参数形式，也就是16个值的矩阵
        const origTransform = this.getTransform();
        this.setTransform(`${rotate} ${origTransform}`);
        this.position.rotate(rotateDirectionKey);
      })
      .then(() => {
        // this.disableTransition();
      });
  }
}
