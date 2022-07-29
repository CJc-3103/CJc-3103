import BlockPosition from './BlockPosition.js';
export default class AnglePositionBRU extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    // const {
    //   LAYER_B,
    //   LAYER_R,
    //   LAYER_U,
    //   LAYER_B_REVER,
    //   LAYER_R_REVER,
    //   LAYER_U_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_U:
    //   case LAYER_R_REVER:
    //     newPosition = new AnglePositionFUR();
    //     break;
    //   case LAYER_B:
    //   case LAYER_U_REVER:
    //     newPosition = new AnglePositionBUL();
    //     break;
    //   case LAYER_R:
    //   case LAYER_B_REVER:
    //     newPosition = new AnglePositionBDR();
    //     break;
    //   default:
    //     break;
    // }
    // switch (this.getRotateGroup(rotateDirection, this.blockDirectionMap)) {
    //   case 1:
    //     newPosition = new AnglePositionFUR();
    //     break;
    //   case 2:
    //     newPosition = new AnglePositionBUL();
    //     break;
    //   case 3:
    //     newPosition = new AnglePositionBDR();
    //     break;
    //   default:
    //     break;
    // }
    let newPosition = this.getNewPosition(rotateDirection);
    if (newPosition) {
      return newPosition;
    }
  }
}
