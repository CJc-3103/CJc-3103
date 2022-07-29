import BlockPosition from './BlockPosition.js';
export default class AnglePositionFDL extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    // const {
    //   LAYER_F,
    //   LAYER_D,
    //   LAYER_L,
    //   LAYER_F_REVER,
    //   LAYER_D_REVER,
    //   LAYER_L_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_F:
    //   case LAYER_L_REVER:
    //     newPosition = new AnglePositionFLU();
    //     break;
    //   case LAYER_D:
    //   case LAYER_F_REVER:
    //     newPosition = new AnglePositionFRD();
    //     break;
    //   case LAYER_L:
    //   case LAYER_D_REVER:
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
    //     newPosition = new AnglePositionFRD();
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
