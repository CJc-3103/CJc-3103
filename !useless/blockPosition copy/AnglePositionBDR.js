import BlockPosition from './BlockPosition.js';
export default class AnglePositionBDR extends BlockPosition {
  constructor(position, blockDirectionMap) {
    super(position, blockDirectionMap);
  }

  // 每个角只能旋转到3个相邻的角块，只需要判定3组6个状态迁移条件
  //   rotate(rotateDirection) {
  //     // let newPosition = null;

  //     //#region
  //     // const {
  //     //   LAYER_B,
  //     //   LAYER_D,
  //     //   LAYER_R,
  //     //   LAYER_B_REVER,
  //     //   LAYER_D_REVER,
  //     //   LAYER_R_REVER,
  //     // } = ROTATE_DIRECTION;
  //     // switch (rotateType) {
  //     //   case LAYER_R:
  //     //   case LAYER_D_REVER: x
  //     //     newPosition = new AnglePositionFRD();
  //     //     break;
  //     //   case LAYER_B:
  //     //   case LAYER_R_REVER: y
  //     //     newPosition = new AnglePositionBRU();
  //     //     break;
  //     //   case LAYER_D:
  //     //   case LAYER_B_REVER: z
  //     //     newPosition = new AnglePositionBLD();
  //     //     break;
  //     //   default:
  //     //     break;
  //     // }
  //     //#endregion

  //     // switch (this.getRotateGroup(rotateDirection, this.blockDirectionMap)) {
  //     //   case 1:
  //     //     newPosition = new AnglePositionFRD();
  //     //     break;
  //     //   case 2:
  //     //     newPosition = new AnglePositionBRU();
  //     //     break;
  //     //   case 3:
  //     //     newPosition = new AnglePositionBLD();
  //     //     break;
  //     //   default:
  //     //     break;
  //     // }
  //     let newPosition = this.getNewPosition(rotateDirection);
  //     if (newPosition) {
  //       return newPosition;
  //     }
  //   }
}
