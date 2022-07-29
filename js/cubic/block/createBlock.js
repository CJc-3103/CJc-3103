import Block from './Block.js';
import BlockPosition from './BlockPosition.js';

//#region 一次性生成所有块
function createBlock(element, blockParams) {
  return new Block(
    element,
    new BlockPosition(blockParams.layers, blockParams.rotatablePositions)
  );
}
export function createAllBlocks(blocksParams) {
  //   console.log(blocksParams);
  console.log('开始生成块，请耐心等待');
  let blockList = [];
  const elements = document.querySelectorAll('.block');
  //   console.log(elements);
  elements.forEach((element) => {
    const className = element.className;
    // 截取类名中的位置信息，示例：X_1_Y_1_Z_1
    const coordinateKey = className.substring(
      className.indexOf('--') + 2,
      className.length
    );
    const blockParams = blocksParams[coordinateKey];
    // console.log(coordinateKey);
    // console.log(coordinateKey);
    // console.log(blockParams);
    blockList.push(createBlock(element, blockParams));
  });
  //   console.log(blockParams);
  console.log('所有块已生成完毕');
  return blockList;
}

// export function createBlockFLU(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_FLU);
// }
// export function createBlockFUR(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_FUR);
// }
// export function createBlockFRD(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_FRD);
// }
// export function createBlockFDL(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_FDL);
// }
// export function createBlockBUL(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_BUL);
// }
// export function createBlockBRU(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_BRU);
// }
// export function createBlockBDR(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_BDR);
// }
// export function createBlockBLD(element) {
//   return createBlock(element, BLOCK_PARAMS.BLOCK_BLD);
// }
//#endregion
