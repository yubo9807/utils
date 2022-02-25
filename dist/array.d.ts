/**
 * 生成指定长度的数组
 * @param len 数组的长度
 */
export declare function createStipulateLengthArr(len: number): number[];
/**
 * 数组排序
 * @param arr 数组
 * @param num 规定排序方式 1：正序， 2：倒序， 3：随机
 */
export declare function arrSort(arr: number[], num?: number): number[];
/**
 * 数组中最大的数
 * @param arr
 */
export declare const arrMax: (arr: number[]) => any;
/**
 * 数组中最小的数
 * @param arr
 */
export declare const arrMin: (arr: number[]) => any;
/**
 * 数组降维
 * @param arr 被降维数组
 */
export declare function arrDropDimension(arr: any[]): any;
/**
 * 数组去重
 * @param arr 被去重数组
 */
export declare const arrUnique: (arr: any[]) => any[];
/**
 * 创建指定长度的随机数的数组，且规定范围
 * @param len 指定长度
 * @param max 最大值（取不到）
 * @param min 最小值
 */
export declare function createLengthRandomArr(len: number, max?: number, min?: number): any[];
/**
 * 类数组转数组
 * @param classArr 类数组对象
 */
export declare function classChangeArr(classArr: Iterable<unknown> | ArrayLike<unknown>): unknown[];
/**
 * 转换为二维数组
 * @param arr 数组
 * @param count 多少个数为一组
 */
export declare function multArray(arr: any[], count?: number): any[];
/**
 * 检查两个数组各项是否相等
 * @param a 数组1
 * @param b 数组2
 * @returns
 */
export declare function isArrayEqual(a: any[], b: any[], res?: boolean): boolean;
/**
 * 检查数组各项相等
 * @param arr
 * @returns
 */
export declare const allEqual: (arr: any[]) => boolean;
/**
 * 两个数组的 交集
 * @param a 数组1
 * @param b 数组2
 * @returns
 */
export declare function diffArray(a: any[], b: any[]): any[];
/**
 * 两个数组的 并集
 * @param a
 * @param b
 * @returns
 */
export declare function haveArr(a: any[], b: any[]): any[];
/**
 * 数组对象去重
 * @param arr 数组
 * @param key 去重的对象属性值
 * @returns
 */
export declare function uniqueArrayObject(arr: object[], key: string | number): object;
/**
 * 数组排列，看有多少种情况
 * @param arr
 * @returns
 * @call permute([1, 2])  //--> [[1, 2], [2, 3]]
 */
export declare function permute(arr: any[]): any[];
