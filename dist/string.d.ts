/**
 * 生成重复字符串
 * @param str 传入字符串
 * @param n 重复次数
 */
export declare const cerateRepeatStr: (str: string, n?: number) => string;
/**
 * 反转字符串
 * @param str
 * @returns
 */
export declare const reverseStr: (str: string) => string;
/**
 * 计算字符串字节长度
 * @param str 传入字符串
 */
export declare const strBytesLength: (str: string) => number;
/**
 * 求一个字符串的 ascll 总和
 * @param str
 */
export declare const stringAscllSum: (str: string) => number;
/**
 * 版本号比较
 * @param v1 版本号1
 * @param v2 版本号2
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1
 */
export declare const compareVersion: (v1: string, v2: string) => 1 | -1 | 0;
/**
 * 金额大些转换
 * @param num 字符串类型数字
 * @returns
 */
export declare function digitUppercase(num?: string): string;
/**
 * HTML 转 AST 语法树
 * @param html
 * @returns 返回 AST 语法树
 */
export declare const parseHtml: (html?: string) => any;
/**
 * 生成随机id
 * @param {*} length
 * @param {*} chars
 */
export declare function uuid(length?: number, chars?: string): string;
