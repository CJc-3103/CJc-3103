import {
  setupLayers,
  setupReverseDirections,
  setupAxisToLayer,
  setupBlockPosition,
  setupDirectionToTransform,
  setupBlocksParams,
} from './setupFuncs.js';
//#region 固定配置；需要手动设置
const LayerCount = 2; // 魔方阶数
// 魔方的轴的别名，同时也绕轴顺时针旋转的别名
export const AXES = {
  AXIS_X: 'X',
  AXIS_Y: 'Y',
  AXIS_Z: 'Z',
};
// 层的别名，同时也是层顺时针旋转的别名
const LAYERS_ALIAS = {
  LAYER_X_1: `L'`, // 注意这里是定义了 X1 层为 L' ，因为 L' 相当于 X 轴的顺时针旋转
  LAYER_X_2: 'R',
  LAYER_Y_1: `D'`,
  LAYER_Y_2: 'U',
  LAYER_Z_1: `B'`,
  LAYER_Z_2: 'F',
};
//#endregion

//#region 动态配置；将上述固定配置作为参数传给特定函数来动态生成
export const LAYERS = setupLayers(
  Object.values(AXES),
  LayerCount,
  LAYERS_ALIAS
);
// 层对象和轴对象中旋转方向的反方向
export const AXES_REVER = setupReverseDirections(AXES);
export const LAYERS_REVER = setupReverseDirections(LAYERS);
// 包含了所有轴与层旋转方向的常量，用于给魔方类验证：旋转方向指令提供的参数是否合法
export const AXES_DIRECTIONS = Object.assign({}, AXES, AXES_REVER);
export const LAYERS_DIRECTIONS = Object.assign({}, LAYERS, LAYERS_REVER);
export const ROTATE_DIRECTIONS = Object.assign(
  {},
  AXES_DIRECTIONS,
  LAYERS_DIRECTIONS
);
// 轴旋转方向与层旋转方向的一对多(数组表示)映射
export const AXES_TO_LAYERS = setupAxisToLayer(
  Object.assign({}, AXES, AXES_REVER),
  LayerCount
);
// 块的位置所处的层，三个层分别表示三个轴方向的坐标
export const BLOCK_POSITIONS = setupBlockPosition(LayerCount, LAYERS);
// 旋转方向与 3D 变换的旋转函数和参数的映射关系
export const ROTATE_DIRECTION_2_TRANSFORM =
  setupDirectionToTransform(AXES_DIRECTIONS);
// 包含所有 Block 对象所需要的参数
// export const BLOCK_PARAMS_LIST = setupBlocksParams(
export const BLOCKS_PARAMS = setupBlocksParams(BLOCK_POSITIONS, LayerCount);
//#endregion
