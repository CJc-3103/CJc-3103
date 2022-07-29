import {
  AXES_DIRECTIONS,
  LAYERS_DIRECTIONS,
  ROTATE_DIRECTIONS,
  AXES_TO_LAYERS,
  BLOCKS_PARAMS,
} from './setup/index.js';
import { createAllBlocks } from './block/index.js';
import { calLayerFromDirection } from './utils/index.js';
import { setTransition, findKeyByValFromMultiMap } from '../utils.js';

export default class Cubic {
  //#region 属性
  _blockList = [];
  _element = null;

  get blockList() {
    return [].concat(this._blockList);
  }

  set blockList(blockList) {
    this._blockList = blockList;
  }

  get element() {
    return this._element;
  }

  set element(element) {
    if (element) {
      this._element = element;
    } else {
      console.log(`Reference Error: 当前魔方的视图不存在`);
    }
  }
  //#endregion

  constructor(cubicClassName, blockClassName) {
    console.log('创建魔方');
    this.initCubic(cubicClassName, blockClassName);
  }

  //#region 方法
  initCubic(cubicClassName, blockClassName) {
    this.element = document.querySelector(cubicClassName);
    this.blockList = createAllBlocks(BLOCKS_PARAMS, blockClassName);
  }

  resetCubic() {
    this.blockList.forEach((block) => {
      block.resetPosition();
    });
  }

  // 开始游戏后再添加过渡效果，否则页面刚加载时，魔方的块和面就会有3D旋转的过渡效果
  enableAllTransition() {
    this.enableTransition('transform 0.5s linear');
    this.blockList.forEach((block) => {
      block.enableTransition('transform 0.5s linear');
    });
  }
  enableTransition(cubicTransition) {
    setTransition(this.element, cubicTransition);
  }

  // 禁用过渡
  disableAllTransition() {
    this.disableTransition();
    this.blockList.forEach((block) => {
      block.disableTransition();
    });
  }
  disableTransition() {
    setTransition(this.element);
  }

  // 检查旋转参数是否合法
  isRotateDirectionValid(rotateDirectionName) {
    if (Object.values(ROTATE_DIRECTIONS).includes(rotateDirectionName)) {
      return true;
    } else {
      console.log('输入的方向有误');
      return false;
    }
  }

  // 旋转若干块；旋转层或旋转魔方整体都调用这个方法
  rotateBlocks(blockList, rotateDirectionName) {
    blockList.forEach((block) => {
      block.rotate(rotateDirectionName);
    });
  }

  // 层的旋转，二阶魔方是：6个面 * 2（顺时针/逆时针） = 12种旋转方式
  //   三阶或以上的魔方，还会有中间层的旋转
  rotateLayer(rotateDirectionName) {
    if (this.isRotateDirectionValid(rotateDirectionName)) {
      // 将旋转方向参数转换成对应的层旋转方向 key
      const result = Object.entries(LAYERS_DIRECTIONS).filter(
        ([, alias]) => alias === rotateDirectionName
      );
      if (result.length > 0) {
        const [[layerDirectionKey]] = result;
        //   console.log(layerDirectionKey);
        // 将层的旋转方向 key 转换为轴的旋转方向 key
        const rotateDirectionKey = findKeyByValFromMultiMap(
          layerDirectionKey,
          AXES_TO_LAYERS
        );
        //
        const rotateBlockList = []; // 旋转层上的所有块
        const rotateLayer = calLayerFromDirection(rotateDirectionName);
        // 判断旋转的层与方向，选出旋转层包含的块
        this.blockList.forEach((block) => {
          if (block.isBlockInRotatingLayer(rotateLayer)) {
            rotateBlockList.push(block);
          }
        });
        this.rotateBlocks(rotateBlockList, rotateDirectionKey);
      } else {
        console.error('some error here');
      }
    }
  }

  // 魔方整体旋转，也就是绕坐标轴的旋转
  rotateCubic(rotateDirectionName) {
    if (this.isRotateDirectionValid(rotateDirectionName)) {
      // 将轴旋转方向参数转换成对应的 key
      const result = Object.entries(AXES_DIRECTIONS).filter(
        ([, alias]) => alias === rotateDirectionName
      );
      if (result.length > 0) {
        const [[axisDirectionKey]] = result;
        // 每次整体旋转，所有块都需要旋转对应的角度
        this.rotateBlocks(this.blockList, axisDirectionKey);
      } else {
        console.error('some error here');
      }
    }
  }
  //#endregion
}
