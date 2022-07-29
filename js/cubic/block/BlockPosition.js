import { findKeyByValFromMultiMap } from '../../utils.js';
import { BLOCKS_PARAMS } from '../setup/index.js';

export default class BlockPosition {
  //#region 属性
  _position = []; // 角块是所有外表面的数组，棱块是所有外表面加当前序号
  _rotatablePositionMap = null; // 当前块经过一次 90deg 旋转可以到达的位置以及相应的旋转方式，旋转方式为 DIRECTINOS 对象的 key
  //#region map 的结构
  //  [
  //    [BLOCK_X_1_Y_1_Z_2, ['AXIS_X', 'AXIS_Y_REVER']],
  //    [BLOCK_X_1_Y_2_Z_1, ['AXIS_X_REVER', 'AXIS_Z']],
  //    [BLOCK_X_2_Y_1_Z_1, ['AXIS_Y', 'AXIS_Z_REVER']],
  //  ],
  //#endregion

  get rotatablePositionMap() {
    return this._rotatablePositionMap;
  }
  // 参数结构符合 new Map() 参数的结构，但并不是 Map 类型
  set rotatablePositionMap(rotatablePositionMap) {
    let map = new Map();
    rotatablePositionMap.forEach((ele) => map.set(ele[0], ele[1]));
    this._rotatablePositionMap = map;
  }

  get position() {
    return [].concat(this._position);
  }

  set position(position) {
    this._position = [].concat(position);
  }
  //#endregion

  constructor(position, rotatablePositionMap) {
    this.setPosition(position, rotatablePositionMap);
  }

  setPosition(position, rotatablePositionMap) {
    this.position = position;
    this.rotatablePositionMap = rotatablePositionMap;
  }

  // 旋转之后要同步更新：position 和 rotatablePositionMap
  rotate(rotateDirectionKey) {
    // 获取新位置的参数
    const newPositionKey = findKeyByValFromMultiMap(
      rotateDirectionKey,
      this.rotatablePositionMap
    );
    // console.log(newPositionKey);
    if (newPositionKey) {
      // 更新位置信息
      const newPosition = BLOCKS_PARAMS[newPositionKey];
      //   console.log(this.position);
      //   console.log(newPosition);
      this.setPosition(newPosition.layers, newPosition.rotatablePositions);
    } else {
      console.log('rotatablePositionMap is invalid');
    }
  }

  // 判断当前块是否在旋转层上
  isBlockInRotatingLayer(rotateLayer) {
    let result = false;
    if (this.position.includes(rotateLayer)) {
      result = true;
    }
    return result;
  }
}
