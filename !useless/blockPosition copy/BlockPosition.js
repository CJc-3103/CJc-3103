import { findKeyByValFromMultiMap } from '../../utils.js';
// import { BLOCK_PARAMS } from '../CUBIC_GLOBAL.js';
export default class BlockPosition {
  //#region 属性
  _position = []; // 角块是所有外表面的数组，棱块是所有外表面加当前序号
  _rotatablePositionMap = null; // 当前块经过一次 90deg 旋转可以到达的位置以及相应的旋转方式
  //#region map 的结构
  //   [1, []],
  //   [2, []],
  //   [3, []],
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

  //#region
  // 将 Block 通过 Cubic 传入的轴向旋转方向转换成本地参数，其中的规则是：
  //   将每个块对应的6种旋转方向分为3组，分组依据是旋转方向能够达到的位置，
  //   当前块经过 X 轴旋转得到的位置记为1，也就是层的旋转方向转换成轴向旋转是 X 轴时，此时的旋转方向被归为分组1；
  //     同理，经过 Y 轴旋转得到的位置记为2（分组2），经过 Z 轴旋转得到的位置记为3（分组3）
  //   此时的 X/Y/Z 轴是所有块统一的，初始状态下的轴向，而不是经过旋转后的轴向
  //   getNewPosition(rotateDirection) {
  //     console.log(rotateDirection);
  //     console.log(this.rotatablePositionMap);
  //     let newPositionClass = findKeyByValFromMultiMap(
  //       rotateDirection,
  //       this.rotatablePositionMap
  //     );
  //     console.log(newPositionClass);
  //     // let newPosition = new newPositionClass();
  //     // let newPosition = new findKeyByValFromMap(
  //     //   rotateDirection,
  //     //   this.rotatablePositionMap
  //     // )();
  //     if (newPosition) {
  //       return newPosition;
  //     } else {
  //       console.log('rotatablePositionMap is invalid');
  //     }
  //   }
  //#endregion

  setPosition(position, rotatablePositionMap) {
    this.position = position;
    this.rotatablePositionMap = rotatablePositionMap;
  }

  // 旋转之后要同步更新：1.位置 2.可旋转到达的位置与对应的旋转方式
  rotate(rotateDirection) {
    // 获取新位置的参数
    let newPosition = findKeyByValFromMultiMap(
      rotateDirection,
      this.rotatablePositionMap
    );
    console.log(newPosition);
    if (newPosition) {
      // 更新
      this.setPosition();
    } else {
      console.log('rotatablePositionMap is invalid');
    }
  }

  // 判断当前块是否在旋转层上
  isBlockInRotateLayer(rotateFace) {
    let result = false;
    if (this.position.includes(rotateFace)) {
      result = true;
    }
    return result;
  }
  // 旋转方法由子类实现，因为每个位置的可旋转方向和可转到的位置都不同，没法统一
}
