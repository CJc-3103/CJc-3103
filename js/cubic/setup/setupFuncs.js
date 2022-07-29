import { filterObj } from '../../utils.js';
import { calLayerFromDirection } from '../utils/index.js';
/* 
  增加魔方阶数时，需要修改以下属性（增加元素）：
  1. 魔方的阶数：LayerCount
  2. 魔方的层：
  3.
*/

//#region 构建函数相关的配置项
const AxisKeyPrefix = 'AXIS_', // 轴对象 key 的前缀
  LayerKeyPrefix = 'LAYER_', // 层对象 key 的前缀
  BlockPositionKeyPrefix = 'BLOCK_', // 位置对象 key 的前缀
  SurfixReverKey = '_REVER', // 旋转方向对象中逆时针属性 key 的后缀
  SurfixReverVal = `'`; // 旋转方向对象中逆时针属性值的后缀
const TransformFunc = 'rotate', // 3D 转换方法
  RotateDeg = '90deg'; // 限制每次 3D 旋转的角度为 90° 的倍数
//#endregion

//#region 通用辅助函数

// 根据轴对象的 key 返回轴名称
const calAxisFromAxisKey = (axisKey) => axisKey.split('_')[1];
// 检查 key 是否代表顺时针方向
const isDirectionClockwise = (directionKey) =>
  directionKey.indexOf(SurfixReverKey) === -1;

//#endregion

//#region 构建函数

//#region 构建各类对象的完整 key
// 构建旋转方向对象的 key；使用函数表达式避免声明提升导致获取不到 SurfixReverKey 的值
const setupDirectionKey = (prefix, directionName, isClockwise) =>
  `${prefix}${directionName}${isClockwise ? '' : SurfixReverKey}`;

/* 
 魔方的轴；轴只需要编码顺时针旋转方向的别名
 参数示例：('X', true)；返回值示例：'AXIS_X'，'AXIS_X_REVER'
 使用函数表达式避免声明提升导致获取不到 AxisKeyPrefix 的值
*/
const setupAxisKey = (axisName, isClockwise) =>
  setupDirectionKey(AxisKeyPrefix, axisName, isClockwise);

// 使用函数表达式避免声明提升导致获取不到 LayerKeyPrefix 的值
const setupLayerKey = (axisName, axisVal, isClockwise) =>
  setupDirectionKey(LayerKeyPrefix, `${axisName}_${axisVal}`, isClockwise);

// 参数可以是一个数组，也可以是三个坐标的序列
const setupBlockPositionKey = (i, j, k) => {
  if (i instanceof Array) {
    [i, j, k] = i;
  }
  return `${BlockPositionKeyPrefix}X_${i}_Y_${j}_Z_${k}`;
};

//#endregion

//#region 按照轴的正向顺序，依次对层重新编码；
//   属性的值相当于别名，别名可以替换为更加符合魔方公式的编码，而此处的属性名是更方便代码编写的编码
//   编码规则说明：沿 X 轴正向，二阶魔方只有两层，分别是 L/R，L 是 X1 层，R 就是 X2 层，同时将各自对应的旋转方向转换成轴向
export function setupLayers(axisNames, layerCount, layersAlias) {
  let layers = {};
  axisNames.forEach((axisName) => {
    for (let i = 1; i < layerCount + 1; i++) {
      let layerKey = setupLayerKey(axisName, i, true);
      layers[layerKey] = layersAlias[layerKey] ?? `${axisName}_${i}`; // 未设置层的别名时会使用默认值
    }
  });
  return layers;
}
//#endregion

//#region 生成上述层对象和轴对象中旋转方向的反方向
// 参数是顺时针方向的轴或层对象
// 以轴向旋转方向为例：
//   {
//     AXIS_X_REVER: `X'`,
//     AXIS_Y_REVER: `Y'`,
//     AXIS_Z_REVER: `Z'`,
//   }
// 对外接口，不包含额外参数
export const setupReverseDirections = (directions) =>
  setupReverseDirectionsWithSurfix(directions, SurfixReverKey, SurfixReverVal);
// 内部函数，需要额外的参数
function setupReverseDirectionsWithSurfix(
  directions,
  surfixReverKey,
  surfixReverVal
) {
  let reverseRotate = [];
  for (const [k, v] of Object.entries(directions)) {
    const endOfSurfixKey = k.indexOf(surfixReverKey),
      endOfSufixVal = v.indexOf(surfixReverVal);
    // 这部分功能与 setupDirectionKey 稍微有点重复，但是有差别：
    //   这里再次实现可以避免截取前缀，然后重新生成完整的 key，
    //   只要直接将后缀反转即可，且原方法并无截去后缀的功能，还是得扩展，不如直接这样实现
    const newKey =
      endOfSurfixKey > -1
        ? k.substring(0, endOfSurfixKey)
        : `${k}${surfixReverKey}`;
    const newVal =
      endOfSufixVal > -1
        ? v.substring(0, endOfSufixVal)
        : `${v}${surfixReverVal}`;
    reverseRotate[newKey] = newVal;
  }
  return reverseRotate;
}
//#endregion

//#region 构建轴旋转方向与层旋转方向的一对多(数组表示)映射；layerCount 表示魔方阶数
export function setupAxisToLayer(axisDirections, layerCount) {
  let map = new Map();
  // 遍历轴的旋转方向
  Object.entries(axisDirections).forEach(([axisDirectionKey]) => {
    let verticalLayersOfAxis = [];
    // 将轴方向上的 n 个层一一添加
    for (let i = 1; i < layerCount + 1; i++) {
      // 判断轴旋转方向是顺时针或逆时针，并据此添加对应方向的层旋转方向
      const isClockwise = isDirectionClockwise(axisDirectionKey);
      const layerKey = setupLayerKey(
        calAxisFromAxisKey(axisDirectionKey),
        i,
        isClockwise
      );
      verticalLayersOfAxis.push(layerKey);

      //   console.log(axisDirectionKey);
      //   console.log(isClockwise);
      //   console.log(layerKey);
    }
    map.set(axisDirectionKey, verticalLayersOfAxis);
  });
  return map;
}
// 以二阶魔方为例：
// export const AXES_TO_LAYERS = new Map([
//   ['AXIS_X', [LAYER_X_1, LAYER_X_2]],
//   ['AXIS_Y', [LAYER_Y_1, LAYER_Y_2]],
//   ['AXIS_Z', [LAYER_Z_1, LAYER_Z_2]],
//   ['AXIS_X_REVER', [LAYER_X_1_REVER, LAYER_X_2_REVER]],
//   ['AXIS_Y_REVER', [LAYER_Y_1_REVER, LAYER_Y_2_REVER]],
//   ['AXIS_Z_REVER', [LAYER_Z_1_REVER, LAYER_Z_2_REVER]],
// ]);
//#endregion

//#region 块的位置所处的层，下划线后面的字母表示的就是各个层的简写；每个块通过三条轴上的层序号实现定位
/* 以二阶魔方为例：
 export const BLOCK_POSITIONS = {
   BLOCK_X_1_Y_1_Z_1: [LAYER_X_1,LAYER_Y_1,LAYER_Z_1]
   ... 以下省略
   }

 根据以上规则，二阶魔方的编码如下：
   正面四个从左下角开始顺时针依次为：112,122,222,212
   背面四个从左下角开始顺时针依次为：111,121,221,211
*/
export function setupBlockPosition(layerCount, layers) {
  let blockPositions = {};
  // 三层循环，每条轴上每次取一层
  layerCount += 1;
  for (let i = 1; i < layerCount; i++) {
    for (let j = 1; j < layerCount; j++) {
      for (let k = 1; k < layerCount; k++) {
        blockPositions[setupBlockPositionKey(i, j, k)] = [
          calLayerFromDirection(layers[setupLayerKey('X', i, true)]),
          calLayerFromDirection(layers[setupLayerKey('Y', j, true)]),
          calLayerFromDirection(layers[setupLayerKey('Z', k, true)]),
        ];
      }
    }
  }
  return blockPositions;
}

//#endregion

//#region 构建旋转方向与 3D 变换的旋转函数和参数的映射关系
// 注意魔方 Y 轴与 3D 变换的 Y 轴正向相反；因此这里不采用函数的自动化构建

/* 示例：
 ROTATE_DIRECTION_2_TRANSFORM = {
   AXIS_X: `${transformFunc}X(${rotateDeg})`,
   AXIS_Y: `${transformFunc}Y(-${rotateDeg})`,
   AXIS_Z: `${transformFunc}Z(${rotateDeg})`,
   AXIS_X_REVER: `${transformFunc}X(-${rotateDeg})`,
   AXIS_Y_REVER: `${transformFunc}Y(${rotateDeg})`,
   AXIS_Z_REVER: `${transformFunc}Z(-${rotateDeg})`,
   };
 */
export const setupDirectionToTransform = (axisDirections) =>
  setupDirectionToTransformWithParams(axisDirections, TransformFunc, RotateDeg);
function setupDirectionToTransformWithParams(
  axisDirections,
  transformFunc,
  rotateDeg
) {
  let directionTransform = {};
  for (const direction in axisDirections) {
    // 判断当前是顺时针还是逆时针
    const axis = calAxisFromAxisKey(direction);
    const isClockwise = isDirectionClockwise(direction);
    // 获取当前轴的名字，并拼接字符串
    directionTransform[direction] = `${transformFunc}${axis}(${
      isClockwise ^ (axis === 'Y') ? '' : '-' // 注意这里是异或
    }${rotateDeg})`;
  }
  return directionTransform;
}
//#endregion

//#region 生成块需要的参数如下：
// 1. 视图元素（由负责块生命周期的对象传递给工厂方法或 Block 构造函数）
// 2. 位置所处的层，也就是 BLOCK_PARAMS 中各对象的 position 属性
// 3. 当前位置经过一次 90deg 旋转能够到达的位置及相应的旋转方式，也就是 BLOCK_PARAMS 中各对象的 rotatablePosition 属性

//#region 辅助函数
// 根据位置名称计算三维坐标值
function calcCoordinateFromPositionKey(positionKey) {
  let splits = positionKey.split('_');
  // 拆分后示例：['BLOCK', 'X', '1', 'Y', '1', 'Z', '1']
  let [, , x, , y, , z] = splits;
  if (x && y && z) {
    return [+x, +y, +z]; // 字符串转成数字
  } else {
    console.error('some error here');
  }
  //   return [x, y, z];
}
// 计算两个三维坐标点，其相等的坐标值数量
function countSameCoordinate(coordinate1, coordinate2) {
  let count = 0;
  for (let i = 0; i < coordinate1.length; i++) {
    count += coordinate1[i] === coordinate2[i];
  }
  return count;
}
// 计算当前块经过一次平面 90deg 旋转能到达的块的位置（有且仅有两个坐标值相同）
function calcRotatablePositions(currentPositionKey, blockPositions) {
  if (
    typeof currentPositionKey === 'string' &&
    typeof blockPositions === 'object'
  ) {
    let rotatablePositions = [];
    let blockCoordinate = calcCoordinateFromPositionKey(currentPositionKey);

    rotatablePositions = filterObj(
      blockPositions,
      (rotatablePosition) => {
        return (
          countSameCoordinate(
            blockCoordinate,
            calcCoordinateFromPositionKey(rotatablePosition)
          ) === 2
        );
      },
      ({ filteredObj }) => {
        return Object.keys(filteredObj).length === 3; // 已经找到3个就停止遍历
      }
    );
    if ((Object.keys(rotatablePositions).length = 3)) {
      return rotatablePositions;
    } else {
      console.error('some error here');
    }
  } else {
    console.log(
      'Type Error: currentPositionKey should be a string and blockPositions should be an object'
    );
  }
}

/* 计算当前块需要经过何种旋转方式（一次 90deg）能够到达目标块
   计算规则如下：
   1. 找到中心轴和辅助轴（的序号）：坐标值相同的两条轴作为旋转时的中心轴，不同的轴作为辅助轴：
        rotateAxesIdx: [axisIdx1,axisIdx2], assistAxisIdx
   2. 构建二维坐标：分别取一个中心轴坐标值和辅助轴坐标值组成平面坐标（也就是向量在平面上的投影向量），坐标顺序是 [x,y]/[y,z]/[z,x]
        2.1 根据上述坐标顺序，构建一个映射表数组：
       x [0,1],[2,0],
       y [0,1],[1,2],
       z [1,2],[2,1]
       拓展：求一个循环序列包含指定项且为特定长度的子序列
        2.2 使用 1 中得到的中心轴序号，从映射表中拿到构建二维坐标需要的坐标序号：
          [[axis1_1,axis,_2],[axis2_1,axis2_2]] =
            [mapping[axisIdx1][0], mapping[axisIdx1][1]],[mapping[axisIdx2][0],mapping[axisIdx2][1]]
        2.3 构建新坐标：
              2.3.1 newCurrentCoordinates = [[currentCoordinate[axis1_1],currentCoordinate[axis1_2]],[currentCoordinate[axis1_1],currentCoordinate[axis1_2]]]
              2.3.2 newRotatableCoordinates = [[rotatableCoordinates[axis1_1],rotatableCoordinates[axis1_2]],[rotatableCoordinates[axis1_1],rotatableCoordinates[axis1_2]]]
   3. 根据递推公式，判断2中得到的两组坐标，分别比较：
        当前坐标和对应的目标坐标（同个平面内的对应坐标，2 中已经按照平面分到了数组 0 和 1 的位置）哪个是 [Xn,Yn]：
        - 若是目标块，则需要顺时针旋转
        - 若为当前块，则是逆时针旋转
        递推关系如下：
          经过推理，发现平面坐标系内的点经过 n*90deg 旋转后可以到达的坐标有如下规律：
            [a,b],[b,n-a+1],[n-a+1,n-b+1],[n-b+1,a]
          由上可得，递推公式为（以 x/y 平面为例）：[Xn,Yn] = [Y(n-1),n-X(n-1)+1]
      因此，根据上述关系比较，并将两组结果按顺序存到数组中 [result1,result2]
    4. 根据 3 的两组结果，使用中心轴和结果值构建能代表旋转方式的值数组，也就是轴的旋转方向（如 AXIS_X/AXIS_Y_REVER）：
       - 若 result 为 true，则不需要添加后缀
       - 若 result 为 false，则需要添加后缀 _REVER
       一共两个平面坐标系，因此是长度为2的数组
*/

/* 推理二维坐标系内的坐标经过 n*90deg 旋转可以到达的坐标之间的关系

2*2
[1,2],[2,2]
[1,1],[2,1]

3*3
[1,3],[2,3],[3,3]
[1,2],[2,2],[3,2]
[1,1],[2,1],[3,1]

4*4
[1,4],[2,4],[3,4],[4,4]
[1,3],[2,3],[3,3],[4,3]
[1,2],[2,2],[3,2],[4,2]
[1,1],[2,1],[3,1],[4,1]

n*n
x/y平面
[1,n],[2,n],[3,n],...,[n,n]
...
[1,3],[2,3],[3,3],...,[n,3]
[1,2],[2,2],[3,2],...,[n,2]
[1,1],[2,1],[3,1],...,[n,1]

角块：[1,1],[1,n],[n,n],[n,1]
棱块：[1,a],[a,n],[n,n-a+1],[n-a+1,1]
中间块（非中心块）：[a,b],[b,n-a+1],[n-a+1,n-b+1],[n-b+1,a]
中心块（只有单数阶的魔方有）；[(n+1)/2,(n+1)/2]

*/

//    废弃的思路（不需要全部计算）：按公式计算另外当前平面内经过旋转（90deg,180deg,-90deg）可到达的3个坐标，坐标按顺时针迁移方向放到数组中，比较当前块坐标与目标块坐标的序号；若当前块序号为0，目标块为 length-1 ，则将当前块视为 length

// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------
// calcCoordinateFromPositionKey 存在重复计算的问题，有待后续优化----------
// -----------------------------------------------------
// -----------------------------------------------------
// -----------------------------------------------------

// 不行，换思路：比较不同的两对坐标值大小，若当前块大，则需要顺时针旋转；否则需要逆时针旋转

// 根据提供的坐标以及魔方的阶数，构建顺时针方向旋转可以到达的二维坐标序列
// function setupPositionsInOrder(coordinate, layerCount) {
//     let position = { coordinate: coordinate };
//     let next = null;
//     for (let i = 0; i < 4; i++) {
//       next = {
//         coordinate: [position[1], layerCount - position[0] + 1],
//       };
//     }
//     return position;
//     let positionsInOrder = [coordinate];
//     for (let i = 1; i < 4; i++) {
//       let [nextAxis1, nextAxis2] = [
//         positionsInOrder[i - 1][1],
//         layerCount - positionsInOrder[i - 1][0] + 1,
//       ];
//       positionsInOrder[i] = [nextAxis1, nextAxis2];
//     }
//     return positionsInOrder;
// }
function calcRotateDirections(
  currentPositionKey,
  rotatablePosition,
  layerCount
) {
  const currentCoordinate = calcCoordinateFromPositionKey(currentPositionKey),
    rotatableCoordinate = calcCoordinateFromPositionKey(rotatablePosition);
  //#region 1. 找到中心轴和辅助轴：坐标值相同的两条轴作为旋转时的中心轴，不同的轴作为辅助轴
  let rotateAxesIdx = [], // 中心轴
    assistAxisIdx = 0;
  for (let i = 0; i < 3; i++) {
    if (currentCoordinate[i] === rotatableCoordinate[i]) {
      rotateAxesIdx.push(i);
    } else {
      assistAxisIdx = i;
    }
  }
  //   console.error('新一轮计算');
  //   console.log(currentCoordinate);
  //   console.log(rotatableCoordinate);
  //   console.log(assistAxisIdx);
  //#endregion

  //#region 2.构建二维坐标：分别取一个中心轴坐标值和辅助轴坐标值组成平面坐标（也就是向量在平面上的投影向量），坐标顺序是 [x,y]/[y,z]/[z,x]
  // 构建一个映射表数组：代表某个轴为辅助轴时，构建新的二维坐标需要查找的坐标值的数组下标
  const axisToPlaneMapping = [
    ['X', [1, 2]],
    ['Y', [2, 0]],
    ['Z', [0, 1]],
  ];
  // 过滤掉未包含辅助轴的映射
  const filteredMapping = axisToPlaneMapping.filter(
    ([, axis]) => axis[0] === assistAxisIdx || axis[1] === assistAxisIdx
  );
  // 取出两组序号；并构建两组二维坐标
  const [[, [axis1_1, axis1_2]], [, [axis2_1, axis2_2]]] = filteredMapping;
  const newCurrentCoordinates = [
      [currentCoordinate[axis1_1], currentCoordinate[axis1_2]],
      [currentCoordinate[axis2_1], currentCoordinate[axis2_2]],
    ],
    newRotatableCoordinates = [
      [rotatableCoordinate[axis1_1], rotatableCoordinate[axis1_2]],
      [rotatableCoordinate[axis2_1], rotatableCoordinate[axis2_2]],
    ];
  //   console.log('当前坐标的投影');
  //   console.log(newCurrentCoordinates);
  //   console.log('目标坐标的投影');
  //   console.log(newRotatableCoordinates);
  //#endregion

  //#region 3. 分析旋转方向
  const analyseRotateDirection = (
    currentCoordinate,
    rotatableCoordinate,
    layerCount
  ) => {
    // 每一组两个坐标的两对坐标值，必须同时满足递推公式的要求：[Xn,Yn] = [Y(n-1),n-X(n-1)+1]
    if (
      rotatableCoordinate[0] === currentCoordinate[1] &&
      rotatableCoordinate[1] === layerCount - currentCoordinate[0] + 1
      //  [1,1] -> [1,2]  代入公式： [1,2] = [1,2-1+1]  顺时针旋转可到达
    ) {
      return true; // 顺时针旋转可到达
    } else {
      if (
        currentCoordinate[0] === rotatableCoordinate[1] &&
        currentCoordinate[1] === layerCount - rotatableCoordinate[0] + 1
      ) {
        return false; // 逆时针旋转可到达
      } else {
        console.error('some error here');
      }
    }
  };
  const results = [
    analyseRotateDirection(
      newCurrentCoordinates[0],
      newRotatableCoordinates[0],
      layerCount
    ),
    analyseRotateDirection(
      newCurrentCoordinates[1],
      newRotatableCoordinates[1],
      layerCount
    ),
  ];
  //   console.log(results);
  //#endregion

  //#region 4. 构建代表旋转方向的值数组
  // 以 [1,1,1] [1,1,2] 为例：
  // 1. rotateAxesIdx = [0,1], assistAxisIdx = 2
  // 2. Z 轴为辅助轴，此时 二维向量投影是 [y,z],[z,x] 即 [[1,1],[1,1]] 和 [[1,2],[2,1]]
  // 3. [true,false]
  let rotateDirections = [
    setupAxisKey(filteredMapping[0][0], results[0]),
    setupAxisKey(filteredMapping[1][0], results[1]),
  ];
  //   console.log(rotateDirections);
  //#endregion
  //   返回值类型 [AXES_Z, AXES_Y_REVER]
  return rotateDirections;
}
//#endregion

// 构建所有 Block 对象所需要的参数，一次性生成完毕
//#region   返回值示例:
//   {
//     position: BLOCK_POSITION.ANGLE_F_L_U,
//     rotatablePosition: [
//       [BLOCK_POSITION.ANGLE_F_U_R, [AXES_Z, AXES_Y_REVER]],
//       [BLOCK_POSITION.ANGLE_F_D_L, [AXES_X_REVER, AXES_Z_REVER]],
//       [BLOCK_POSITION.ANGLE_B_U_L, [AXES_Y, AXES_X]],
//     ],
//   },
//   );
//#endregion
export function setupBlocksParams(blockPositions, layerCount) {
  let blocksParams = {};

  for (const [currentPositionKey, currentPositionLayers] of Object.entries(
    blockPositions
  )) {
    // 1. 初始化 blockParams 参数
    const currentCoordinate = calcCoordinateFromPositionKey(currentPositionKey);
    const coordinateName = setupBlockPositionKey(currentCoordinate);
    let blockParams = {
      layers: currentPositionLayers,
      rotatablePositions: null,
    };
    // 2. 比较当前块与所有块的坐标，找到其中三个与当前块具有两个相同坐标值的块，也就是经过平面旋转能到达的位置
    let rotatablePositionList = Object.entries(
      calcRotatablePositions(currentPositionKey, blockPositions)
    );

    // 3. 计算当前块需要经过何种旋转方式能够到达目标块，也就是计算旋转中心轴以及对应的 n*90deg 的值，并且结果会表示成绕坐标轴旋转的形式
    let rotatablePositions = [];
    rotatablePositionList.forEach(
      ([rotatablePosition, rotatablePositionLayers]) => {
        let rotateDirections = calcRotateDirections(
          currentPositionKey,
          rotatablePosition,
          layerCount
        );
        // rotatablePositions.push([rotatablePositionLayers, rotateDirections]);
        rotatablePositions.push([rotatablePosition, rotateDirections]);
      }
    );
    blockParams.rotatablePositions = rotatablePositions;
    blocksParams[coordinateName] = blockParams;
  }
  if (blocksParams) {
    return blocksParams;
  } else {
    console.error('some error here');
  }
}
//#endregion

//#endregion
