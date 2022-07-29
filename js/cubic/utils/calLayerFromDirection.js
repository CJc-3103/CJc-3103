// 旋转的是层时，根据旋转方向返回对应的层：若旋转方向为逆时针，则去掉'，仅保留层名
export function calLayerFromDirection(rotateDirection) {
  if (typeof rotateDirection === 'string') {
    const endIdx = rotateDirection.indexOf(`'`);
    return endIdx > -1 ? rotateDirection.substring(0, endIdx) : rotateDirection;
  }
}
