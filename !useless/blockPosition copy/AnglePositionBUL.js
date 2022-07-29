import BlockPosition from './BlockPosition.js';
export default class AnglePositionBUL extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    // const {
    //   LAYER_B,
    //   LAYER_U,
    //   LAYER_L,
    //   LAYER_B_REVER,
    //   LAYER_U_REVER,
    //   LAYER_L_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_L:
    //   case LAYER_U_REVER:
    //     newPosition = new AnglePositionFLU();
    //     break;
    //   case LAYER_U:
    //   case LAYER_B_REVER:
    //     newPosition = new AnglePositionBRU();
    //     break;
    //   case LAYER_B:
    //   case LAYER_L_REVER:
    //     newPosition = new AnglePositionBLD();
    //     break;
    //   default:
    //     break;
    // }
    // switch (this.getRotateGroup(rotateDirection, this.blockDirectionMap)) {
    //   case 1:
    //     newPosition = new AnglePositionFLU();
    //     break;
    //   case 2:
    //     newPosition = new AnglePositionBRU();
    //     break;
    //   case 3:
    //     newPosition = new AnglePositionBLD();
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
