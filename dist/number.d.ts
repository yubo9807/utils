/**
 * 生成随机数
 * @param max 最大值（取不到，只可取正整数）
 * @param min 最小值
 */
export declare function randomNum(max: number, min?: number): number;
/**
 * 整数数字求和
 * @param args
 */
export declare function numberSum(...args: number[]): number;
/**
 * 数字生成器
 * @call const iter = createNum(); iter.next().value;
 */
export declare function createNum(): Generator<number, void, unknown>;
/**
 * 浮点数数字求和，解决(0.1 + 0.2 != 0.3)的问题
 * @param args
 * @returns
 */
export declare function fixedNumberAdd(...args: number[]): number;
/**
 * 数字加密
 * @param num 手机号，银行卡号之类的数组或字符串
 * @param start 开始加密索引
 * @param end 结束加密索引
 */
export declare function numberEncrypt(num: number | string, start?: number, end?: number): string;
/**
 * 截取两位小数并进行银行计数转换
 * @param num 一个数
 * @param fixed 保留几位小数
 * @returns
 */
export declare function toFixed2AndBankCount(num?: string | number, fixed?: number): string;
/**
 * 小数转百分比
 * @param num
 * @param digit 保留小数位
 * @returns
 */
export declare function numberPercentage(num: number | string, digit?: number): string;
/**
 * 计算两点之间的距离
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
export declare function count2Spotlength(x1: number, y1: number, x2: number, y2: number): number;
/**
 * 反转整数
 * @param num 最大限制 9 位 + 1
 * @returns
 */
export declare function reverseInteger(num: number): number;
/**
 * 整数转英文单词
 * @param num
 * @returns
 */
export declare function numberToWords(num: number): string;
/**
 * 判断 x 是否是 2 的 n 次方
 * @param x
 * @returns
 */
export declare function isPowerOf2(x: number): boolean;
