// 将键与值的一对多映射转换为值与键的反向一对一映射
export function transOptionsMap(optionsMap) {
  let newOptionsMap = new Map();
  for (const [action, conditions] of [...optionsMap.entries()]) {
    conditions.forEach((condition) => newOptionsMap.set(condition, action));
  }
  return newOptionsMap;
}

export function compare(a, b) {
  return a === b;
}

// 根据值返回映射中对应的键，参数是将要匹配的值和原映射对象
export function findKeyByValFromMap(value, map) {
  console.log(map);
  let result = Object.keys(map).find((k) => compare(map[k], value));
  console.log(result);
  return result;
}
// 在一对多键值对映射中，根据值返回对应的键
export function findKeyByValFromMultiMap(value, map) {
  return Array.from(map.keys()).find((k) => {
    return !!map.get(k).find((val) => {
      return value === val;
    });
  });
}

export function setTransition(element, transition) {
  if (transition) {
    element.style.transition = transition;
  } else {
    element.style.transition = '';
  }
}

export const getFirstProp = (obj) => Object.keys(obj)[0];

/**
 * 类似数组过滤方法的对象过滤方法
 * @param {*} obj 将要筛选的对象；必需
 * @param {*} filterFunc 作为筛选的回调，返回布尔值；必需
 * @param {*} stopFunc 需要提前终止遍历时的判定函数，返回布尔值；可选
 * @param {*} iterateFunc 需要提前终止遍历时，可以在每一轮遍历时迭代表达式；可选
 * @param {*} startIterateFunc 判断当前是否需要迭代
 * @returns 筛选后的对象；没有符合条件的属性或值时返回空对象
 */
export function filterObj(
  obj,
  filterFunc,
  stopFunc
  //   iterateFunc,
  //   startIterateFunc
) {
  let tempObj = Object.assign({}, obj), // 保存对象副本，剔除不符合的属性和值后剩下的属性和值
    filteredObj = {}, // 符合条件的属性和值
    removedObj = {}, // 已剔除的属性和值
    iterateCount = 0, // 当前已经迭代的轮数
    iterateResult = undefined; // 保存额外的迭代结果
  for (const [key, val] of Object.entries(tempObj)) {
    if (filterFunc(key, val)) {
      filteredObj[key] = val;
      Reflect.deleteProperty(tempObj, key);
    } else {
      removedObj[key] = val;
    }
    iterateCount++;
    // if (iterateFunc) {
    //   if (startIterateFunc) {
    //     iterateResult = iterateFunc(iterateResult);
    //   }
    // }
    if (stopFunc) {
      if (
        stopFunc({
          filteredObj: filteredObj,
          removedObj: removedObj,
          iterateCount: iterateCount,
          iterateResult: iterateResult,
        })
      ) {
        return filteredObj;
      }
    }
    // console.log(iterateResult);
  }
  return filteredObj;
}
