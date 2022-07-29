import BlockPosition from './BlockPosition.js';
export default class AnglePositionFUR extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    // const {
    //   LAYER_F,
    //   LAYER_U,
    //   LAYER_R,
    //   LAYER_F_REVER,
    //   LAYER_U_REVER,
    //   LAYER_R_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_U:
    //   case LAYER_F_REVER:
    //     newPosition = new AnglePositionFLU();
    //     break;
    //   case LAYER_F:
    //   case LAYER_R_REVER:
    //     newPosition = new AnglePositionFRD();
    //     break;
    //   case LAYER_R:
    //   case LAYER_U_REVER:
    //     newPosition = new AnglePositionBRU();
    //     break;
    //   default:
    //     break;
    // }
    // switch (this.getRotateGroup(rotateDirection, this.blockDirectionMap)) {
    //   case 1:
    //     newPosition = new AnglePositionFLU();
    //     break;
    //   case 2:
    //     newPosition = new AnglePositionFRD();
    //     break;
    //   case 3:
    //     newPosition = new AnglePositionBRU();
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
