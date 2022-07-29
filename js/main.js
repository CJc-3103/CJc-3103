import Cubic from './cubic/Cubic.js';

(() => {
  //   console.log(module);
  console.log('游戏开始');
  // 生成魔方
  const cubic = new Cubic();
  function getRotateDirection(e) {
    return e.target.innerText;
  }
  // 添加事件监听
  function logRotate(rotateDirection) {
    console.log(`当前旋转方向是：${rotateDirection}`);
  }
  document
    .querySelector('.layer-action-group')
    // .querySelector('.action-group-container')
    .addEventListener('click', (e) => {
      let rotateDirection = getRotateDirection(e);
      cubic.rotateLayer(rotateDirection);
      logRotate(rotateDirection);
    });

  document
    .querySelector('.cubic-action-group')
    .addEventListener('click', (e) => {
      let rotateDirection = getRotateDirection(e);
      cubic.rotateCubic(rotateDirection);
      logRotate(rotateDirection);
    });
})();
