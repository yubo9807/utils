import { randomNum } from './number';
/**
 * 生成指定长度的数组
 * @param len 数组的长度
 */
export function createStipulateLengthArr(len) {
    return [...new Array(len).keys()];
}
/**
 * 数组排序
 * @param arr 数组
 * @param num 规定排序方式 1：正序， 2：倒序， 3：随机
 */
export function arrSort(arr, num = 1) {
    if (num === 1)
        return [...arr].sort((a, b) => a - b);
    if (num === 2)
        return [...arr].sort((a, b) => b - a);
    if (num === 3)
        return [...arr].sort(() => Math.random() - 0.5);
}
/**
 * 数组中最大的数
 * @param arr
 */
export const arrMax = (arr) => Math.max.apply(null, arr);
/**
 * 数组中最小的数
 * @param arr
 */
export const arrMin = (arr) => Math.min.apply(null, arr);
/**
 * 数组降维
 * @param arr 被降维数组
 */
export function arrDropDimension(arr) {
    return Array.prototype.concat.apply([], arr);
}
/**
 * 数组去重
 * @param arr 被去重数组
 */
export const arrUnique = (arr) => [...new Set(arr)];
/**
 * 创建指定长度的随机数的数组，且规定范围
 * @param len 指定长度
 * @param max 最大值（取不到）
 * @param min 最小值
 */
export function createLengthRandomArr(len, max = 10, min = 0) {
    let arr = new Array(len);
    const uniqueArr = (arr) => [...new Set(arr)]; // 数组去重
    // 生成数组
    (function produceArr() {
        let i = 0;
        while (i < arr.length) {
            arr[i] = randomNum(max, min);
            i++;
        }
        return uniqueArr(arr).length < len && produceArr(); // 去重后的数组小于数组的长度，再次生成数组
    }());
    return arr;
}
/**
 * 类数组转数组
 * @param classArr 类数组对象
 */
export function classChangeArr(classArr) {
    return Array.from(classArr);
}
/**
 * 转换为二维数组
 * @param arr 数组
 * @param count 多少个数为一组
 */
export function multArray(arr, count = 2) {
    const pages = [];
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
 */
export function isArrayEqual(a, b, res = true) {
    if (a.length !== b.length)
        return res = false;
    const s = new Set(b);
    if (a.find(x => !s.has(x)))
        return res = false;
    return res;
}
// isArrayEqual([6, 5, 2, 4, 1, 3], [1, 2, 3, 4, 5, 6])  //--> false
/**
 * 检查数组各项相等
 * @param arr
 * @returns
 */
export const allEqual = (arr) => arr.every(item => item === arr[0]);
// allEqual([1, 1, 1, 1])  //--> true
/**
 * 两个数组的 交集
 * @param a 数组1
 * @param b 数组2
 * @returns
 */
export function diffArray(a, b) {
    const s = new Set(b);
    let arr = a.filter(x => !s.has(x));
    return arr;
}
// diffArray(['a', 2, 6, 7], ['a', 2, 9, 'b'])  //--> [6, 7]
/**
 * 两个数组的 并集
 * @param a
 * @param b
 * @returns
 */
export function haveArr(a, b) {
    const s = new Set(b);
    return a.filter(x => s.has(x));
}
// haveArr([1, 2, 6, 7], [1, 2, 9, 5])  //--> [1, 2]
/**
 * 数组对象去重
 * @param arr 数组
 * @param key 去重的对象属性值
 * @returns
 */
export function uniqueArrayObject(arr, key) {
    return arr.reduce((acc, cur) => {
        const ids = acc.map(item => item[key]);
        return ids.includes(cur[key]) ? acc : [...acc, cur];
    }, []);
}
/**
 * 找出数组中只出现一次的数字
 * @param arr
 * @returns
 */
export function querySingle(arr) {
    return arr.reduce((a, b) => a ^ b, 0);
}
/**
 * 数组排列，看有多少种情况
 * @param arr
 * @returns
 * @call permute([1, 2])  //--> [[1, 2], [2, 3]]
 */
export function permute(arr) {
    let results = [];
    let go = (current) => {
        if (current.length === arr.length) {
            results.push(current);
            return;
        }
        arr.forEach(n => {
            if (!current.includes(n)) {
                go([...current, n]);
            }
        });
    };
    go([]);
    return results;
}
