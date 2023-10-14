import { randomNum } from './number';
import { clone } from "./object";


/**
 * 创建一个指定长度的数组，并填入内容
 * 与 new Array(len).fill() 的不同是写入的每一项不会出现同一引用地址
 * @param len 
 * @param item 
 * @returns 
 */
export function createArray(len: number, item: any = void 0) {
  const arr = new Array(len);
  let i = 0;
  while (i < arr.length) {
    arr[i] = clone(item);
    i++;
  }
  return arr;
}

/**
 * 数组中最大的数
 * @param arr 
 */
export function arrMax(arr: number[]) {
  return Math.max.apply(null, arr);
}

/**
 * 数组中最小的数
 * @param arr 
 */
export function arrMin(arr: number[]) {
  Math.min.apply(null, arr);
}

/**
 * 数组降维
 * @param arr 被降维数组
 */
export function arrDropDimension(arr: any[]) {
  return Array.prototype.concat.apply([], arr);
}

/**
 * 创建指定长度的随机数的数组，且规定范围
 * @param len 指定长度
 * @param max 最大值（取不到）
 * @param min 最小值
 */
export function createLengthRandomArr(len: number, max: number = 10, min: number = 0) {
  let arr = new Array(len);
  const uniqueArr = (arr: number[]) => [...new Set(arr)];  // 数组去重
  // 生成数组
  (function produceArr() {
    let i = 0;
    while (i < arr.length) {
      arr[i] = randomNum(max, min);
      i++;
    }
    return uniqueArr(arr).length < len && produceArr();  // 去重后的数组小于数组的长度，再次生成数组
  }());
  return arr;
}

/**
 * 类数组转数组
 * @param classArr 类数组对象
 */
export function classChangeArr(classArr: Iterable<unknown> | ArrayLike<unknown>) {
  return Array.from(classArr);
}

/**
 * 转换为二维数组
 * @param arr   数组
 * @param count 多少个数为一组
 */
export function multArray(arr: any[], count = 2) {
  const pages: any[] = [];
  arr.forEach((item, index) => {
    const page = Math.floor(index / count);
    !pages[page] && (pages[page] = []);
    pages[page].push(item);
  });
  return pages;
}

/**
 * 检查两个数组各项是否相等
 * @param a 数组1
 * @param b 数组2
 * @returns 
 * @call isArrayEqual([6, 5, 2, 4, 1, 3], [1, 2, 3, 4, 5, 6])  //--> false
 */
export function isArrayEqual(a: any[], b: any[], res = true) {
  if (a.length !== b.length) return res = false;
  const s = new Set(b);
  if (a.find(x => !s.has(x))) return res = false;
  return res;
}

/**
 * 检查数组各项相等
 * @param arr 
 * @returns 
 * @call allEqual([1, 1, 1, 1])  //--> true
 */
export function allEqual(arr: any[]) {
  return arr.every(item => item === arr[0]);
}

/**
 * 两个数组的 交集
 * @param a 数组1
 * @param b 数组2
 * @returns 
 * @call intersectionArray(['a', 2, 6, 7], ['a', 2, 9, 'b'])  //--> [6, 7]
 */
export function intersectionArray(a: any[], b: any[]) {
  const s = new Set(b);
  let arr = a.filter(x => !s.has(x));
  return arr;
}

/**
 * 两个数组的 并集
 * @param a 
 * @param b 
 * @returns 
 * @call unionArr([1, 2, 6, 7], [1, 2, 9, 5])  //--> [1, 2]
 */
export function unionArr(a: any[], b: any[]) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

/**
 * 数组对象去重
 * @param arr 数组
 * @param key 去重的对象属性值
 * @returns 
 */
export function uniqueArrayObject(arr: object[], key: string | number) {
  return arr.reduce((acc: any[], cur: object) => {
    const ids = acc.map(item => item[key]);
    return ids.includes(cur[key]) ? acc : [...acc, cur];
  }, []);
}

/**
 * 找出数组中只出现一次的数字
 * @param arr 
 * @returns 
 */
export function querySingle(arr: number[]) {
  return arr.reduce((a, b) => a ^ b, 0);
}

/**
 * 数组排列，看有多少种情况
 * @param arr
 * @returns 
 * @call permute([1, 2])  //--> [[1, 2], [2, 3]]
 */
export function permute(arr: any[]) {
  let results: any[] = [];

  let go = (current: any[]) => {
    if (current.length === arr.length) {
      results.push(current);
      return;
    }
    arr.forEach(n => {
      if (!current.includes(n)) {
        go([...current, n]);
      }
    });
  }
  go([]);
  return results;
}

/**
 * 获取两个颜色的中间色（rgba 不在考虑范围内）
 * @param startColor 开始颜色 (长度为3的数组)
 * @param endColor   结束颜色 (长度为3的数组)
 * @param num        需要多少个
 * @returns rgb list
 */
export function getMiddleColorList(startColor: number[], endColor: number[], num: number): number[][] {

  const rStep = (endColor[0] - startColor[0]) / num;
  const gStep = (endColor[1] - startColor[1]) / num;
  const bStep = (endColor[2] - startColor[2]) / num;

  const gradientColorArr = [];

  for (let i = 0; i < num; i++) {
    gradientColorArr.push([
      Math.round(startColor[0] + i * rStep),
      Math.round(startColor[1] + i * gStep),
      Math.round(startColor[2] + i * bStep)
    ])
  }

  return gradientColorArr;
}
