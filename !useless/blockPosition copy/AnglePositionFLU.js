import BlockPosition from './BlockPosition.js';
export default class AnglePositionFLU extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  rotate(rotateDirection) {
    // let newPosition = null;
    //#region
    // const {
    //   LAYER_U,
    //   LAYER_L,
    //   LAYER_F,
    //   LAYER_U_REVER,
    //   LAYER_L_REVER,
    //   LAYER_F_REVER,
    // } = ROTATE_DIRECTION;

    // switch (rotateDirection) {
    //   case LAYER_F:
    //   case LAYER_U_REVER: z
    //     newPosition = new AnglePositionFUR();
    //     break;
    //   case LAYER_L:
    //   case LAYER_F_REVER: x
    //     newPosition = new AnglePositionFDL();
    //     break;
    //   case LAYER_U:
    //   case LAYER_L_REVER: y
    //     newPosition = new AnglePositionBUL();
    //     break;
    //   default:
    //     break;
    // }
    //#endregion
    // switch (this.getRotateGroup(rotateDirection, this.blockDirectionMap)) {
    //   case 1:
    //     newPosition = new AnglePositionFUR();
    //     break;
    //   case 2:
    //     newPosition = new AnglePositionFDL();
    //     break;
    //   case 3:
    //     newPosition = new AnglePositionBUL();
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
