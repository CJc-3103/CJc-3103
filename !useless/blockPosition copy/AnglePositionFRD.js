import BlockPosition from './BlockPosition.js';
export default class AnglePositionFRD extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    // const {
    //   LAYER_F,
    //   LAYER_R,
    //   LAYER_D,
    //   LAYER_F_REVER,
    //   LAYER_R_REVER,
    //   LAYER_D_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_R:
    //   case LAYER_F_REVER:
    //     newPosition = new AnglePositionFUR();
    //     break;
    //   case LAYER_F:
    //   case LAYER_D_REVER:
    //     newPosition = new AnglePositionFDL();
    //     break;
    //   case LAYER_D:
    //   case LAYER_R_REVER:
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
    //     newPosition = new AnglePositionFDL();
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
