import {
  AXES_DIRECTIONS,
  LAYERS_DIRECTIONS,
  ROTATE_DIRECTIONS,
  AXES_TO_LAYERS,
  BLOCKS_PARAMS,
  calLayerFromDirection,
} from './modules/index.js';
// } from './modules/setupCubic.js';
import { createAllBlocks } from './block/index.js';
// import { createAllBlocks } from './block/createBlock.js';
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

  constructor() {
    console.log('创建魔方');
    this.initCubic();
  }

  //#region 方法
  initCubic() {
    //#region 获取魔方和块的视图元素
    this.element = document.querySelector('.cubic');
    //#region
    // const blockFLU = document.querySelector('.block_angle--flu'),
    //   blockFUR = document.querySelector('.block_angle--fur'),
    //   blockFRD = document.querySelector('.block_angle--frd'),
    //   blockFDL = document.querySelector('.block_angle--fdl'),
    //   blockBUL = document.querySelector('.block_angle--bul'),
    //   blockBRU = document.querySelector('.block_angle--bru'),
    //   blockBDR = document.querySelector('.block_angle--bdr'),
    //   blockBLD = document.querySelector('.block_angle--bld');
    //#endregion
    //#endregion
    //#region 解构全局变量
    // 结构块的位置
    // const {
    //   POSITION_ANGLE_FLU,
    //   POSITION_ANGLE_FUR,
    //   POSITION_ANGLE_FRD,
    //   POSITION_ANGLE_FDL,
    //   POSITION_ANGLE_BUL,
    //   POSITION_ANGLE_BRU,
    //   POSITION_ANGLE_BDR,
    //   POSITION_ANGLE_BLD,
    // } = BLOCK_POSITION;
    // // 结构旋转方向
    // const {
    //   LAYER_U,
    //   LAYER_R,
    //   LAYER_D,
    //   LAYER_L,
    //   LAYER_F,
    //   LAYER_B,
    //   LAYER_U_REVER,
    //   LAYER_R_REVER,
    //   LAYER_D_REVER,
    //   LAYER_L_REVER,
    //   LAYER_F_REVER,
    //   LAYER_B_REVER,
    // } = ROTATE_DIRECTIONS;
    //#endregion
    //#region 生成魔方的块

    //#region
    // this.blockList = [
    //   new Block(
    //     blockFLU,
    //     new BlockPosition(POSITION_ANGLE_FLU, [
    //       [BlockPosition, [LAYER_F, LAYER_U_REVER]],
    //       [BlockPosition, [LAYER_L, LAYER_F_REVER]],
    //       [BlockPosition, [LAYER_U, LAYER_L_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockFUR,
    //     new BlockPosition(POSITION_ANGLE_FUR, [
    //       [BlockPosition, [LAYER_U, LAYER_F_REVER]],
    //       [BlockPosition, [LAYER_F, LAYER_R_REVER]],
    //       [BlockPosition, [LAYER_R, LAYER_U_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockFRD,
    //     new BlockPosition(POSITION_ANGLE_FRD, [
    //       [BlockPosition, [LAYER_R, LAYER_F_REVER]],
    //       [BlockPosition, [LAYER_F, LAYER_D_REVER]],
    //       [BlockPosition, [LAYER_D, LAYER_R_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockFDL,
    //     new BlockPosition(POSITION_ANGLE_FDL, [
    //       [BlockPosition, [LAYER_F, LAYER_L_REVER]],
    //       [BlockPosition, [LAYER_D, LAYER_F_REVER]],
    //       [BlockPosition, [LAYER_L, LAYER_D_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockBUL,
    //     new BlockPosition(POSITION_ANGLE_BUL, [
    //       [BlockPosition, [LAYER_L, LAYER_U_REVER]],
    //       [BlockPosition, [LAYER_U, LAYER_B_REVER]],
    //       [BlockPosition, [LAYER_B, LAYER_L_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockBRU,
    //     new BlockPosition(POSITION_ANGLE_BRU, [
    //       [AnglePositionFUR, [LAYER_U, LAYER_R_REVER]],
    //       [AnglePositionBUL, [LAYER_B, LAYER_U_REVER]],
    //       [AnglePositionBDR, [LAYER_R, LAYER_B_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockBDR,
    //     new BlockPosition(POSITION_ANGLE_BDR, [
    //       [AnglePositionFUR, [LAYER_R, LAYER_D_REVER]],
    //       [AnglePositionBUL, [LAYER_B, LAYER_R_REVER]],
    //       [AnglePositionBDR, [LAYER_D, LAYER_B_REVER]],
    //     ])
    //   ),
    //   new Block(
    //     blockBLD,
    //     new BlockPosition(POSITION_ANGLE_BLD, [
    //       [AnglePositionFUR, [LAYER_D, LAYER_L_REVER]],
    //       [AnglePositionBUL, [LAYER_L, LAYER_B_REVER]],
    //       [AnglePositionBDR, [LAYER_B, LAYER_D_REVER]],
    //     ])
    //   ),
    // ];
    //#endregion
    //#region
    // this.blockList = [
    //   new Block(
    //     blockFLU,
    //     new BlockPosition(POSITION_ANGLE_FLU, [
    //       [POSITION_ANGLE_FUR, [LAYER_F, LAYER_U_REVER]],
    //       [POSITION_ANGLE_FDL, [LAYER_L, LAYER_F_REVER]],
    //       [POSITION_ANGLE_BUL, [LAYER_U, LAYER_L_REVER]],
    //     ])
    //   ),
    //   //   new Block(
    //   //     blockFUR,
    //   //     new BlockPosition(POSITION_ANGLE_FUR, [
    //   //       [POSITION_ANGLE_FLU, [LAYER_U, LAYER_F_REVER]],
    //   //       [POSITION_ANGLE_FRD, [LAYER_F, LAYER_R_REVER]],
    //   //       [POSITION_ANGLE_BRU, [LAYER_R, LAYER_U_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockFRD,
    //   //     new BlockPosition(POSITION_ANGLE_FRD, [
    //   //       [POSITION_ANGLE_FUR, [LAYER_R, LAYER_F_REVER]],
    //   //       [POSITION_ANGLE_FDL, [LAYER_F, LAYER_D_REVER]],
    //   //       [POSITION_ANGLE_BDR, [LAYER_D, LAYER_R_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockFDL,
    //   //     new BlockPosition(POSITION_ANGLE_FDL, [
    //   //       [POSITION_ANGLE_FLU, [LAYER_F, LAYER_L_REVER]],
    //   //       [POSITION_ANGLE_FRD, [LAYER_D, LAYER_F_REVER]],
    //   //       [POSITION_ANGLE_BLD, [LAYER_L, LAYER_D_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockBUL,
    //   //     new BlockPosition(POSITION_ANGLE_BUL, [
    //   //       [POSITION_ANGLE_FLU, [LAYER_L, LAYER_U_REVER]],
    //   //       [POSITION_ANGLE_BRU, [LAYER_U, LAYER_B_REVER]],
    //   //       [POSITION_ANGLE_BLD, [LAYER_B, LAYER_L_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockBRU,
    //   //     new BlockPosition(POSITION_ANGLE_BRU, [
    //   //       [POSITION_ANGLE_FUR, [LAYER_U, LAYER_R_REVER]],
    //   //       [POSITION_ANGLE_BUL, [LAYER_B, LAYER_U_REVER]],
    //   //       [POSITION_ANGLE_BDR, [LAYER_R, LAYER_B_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockBDR,
    //   //     new BlockPosition(POSITION_ANGLE_BDR, [
    //   //       [POSITION_ANGLE_FRD, [LAYER_R, LAYER_D_REVER]],
    //   //       [POSITION_ANGLE_BRU, [LAYER_B, LAYER_R_REVER]],
    //   //       [POSITION_ANGLE_BLD, [LAYER_D, LAYER_B_REVER]],
    //   //     ])
    //   //   ),
    //   //   new Block(
    //   //     blockBLD,
    //   //     new BlockPosition(POSITION_ANGLE_BLD, [
    //   //       [POSITION_ANGLE_FDL, [LAYER_D, LAYER_L_REVER]],
    //   //       [POSITION_ANGLE_BUL, [LAYER_L, LAYER_B_REVER]],
    //   //       [POSITION_ANGLE_BDR, [LAYER_B, LAYER_D_REVER]],
    //   //     ])
    //   //   ),
    // ];
    //#endregion
    // this.blockList = createBlock()
    this.blockList = createAllBlocks(BLOCKS_PARAMS);
    //#endregion
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
