/**
 * 浅层克隆
 * @param origin 被克隆对象
 * @param target 克隆对象
 */
export declare function mappingObj(origin: {
    [x: string]: any;
}, target?: object): object;
/**
 * 深度克隆
 * @param origin 被克隆对象
 * @param target 克隆对象
 */
export declare function deepCloneObj(origin: {
    [x: string]: any;
    hasOwnProperty: (arg0: string) => any;
}, target?: object): object;
/**
 * 深度克隆对象
 * JSON.parse(JSON.stringify(obj))  // 此方法无法合并代理对象
 * @param obj
 */
export declare function cloneObj(obj: any): any;
/**
 * 获取对象的 value 值
 * @param obj 要查询的对象
 * @param name 对象的 key 值 “a.b”
 */
export declare function getValue(obj: any, name: string): any;
/**
 * 设置对象 value 值
 * @param obj  PS: {a: 1, b: {c: 3}}
 * @param data 要改变的 key 值  PS: a 或 b.c
 * @param value 设置 value
 */
export declare function setValue(obj: any, data: string, value: any): void;
/**
 * 获取一个对象的字节大小
 * @param obj
 * @returns
 */
export declare function getLSUsedSpace(obj: any): number;
/**
 * 对象转化为formdata
 * @param {Object} object
 */
export declare function getFormData(object: any): any;
