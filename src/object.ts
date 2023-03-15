import { AnyObj } from "./type";

declare const FormData: any;

/**
 * 深度克隆
 * @param target 
 * @returns 
 */
export function deepClone(target: AnyObj) {
	return new Promise(resolve => {
		const { port1, port2 } = new MessageChannel();
		port1.postMessage(target);
		port2.onmessage = msg => {
			resolve(msg.data);
		}
	})
}

/**
 * 浅层克隆
 * @param origin 被克隆对象
 * @param target 克隆对象
 */
export function mappingObj(origin: AnyObj, target: AnyObj = {}) {
	for (const prop in origin) {
		target[prop] = origin[prop];
	}
	return target;
}

/**
 * 深度克隆
 * @param origin 被克隆对象
 * @param target 克隆对象
 */
export function deepCloneObj(origin: AnyObj, target: AnyObj = {}) {
	const toStr = Object.prototype.toString;
	for (const prop in origin) {
		if (origin.hasOwnProperty(prop)) {  // 查看自身属性是否存在
			// 判断是数组还是对象
			if (origin[prop] !== null && typeof (origin[prop]) === 'object') {
				target[prop] = toStr.call(origin[prop]) == '[object Array]' ? [] : {};
				deepCloneObj(origin[prop], target[prop]);  // 重新克隆子级
			} else {
				target[prop] = origin[prop];
			}
		}
	}
	return target;
}

/**
 * 深度克隆对象
 * JSON.parse(JSON.stringify(obj))  // 此方法无法合并代理对象
 * @param obj 
 */
export function clone(obj: any) {
	// 克隆算法
	if (obj instanceof Array) return cloneArray(obj);
	else if (obj instanceof Object) return cloneObject(obj);
	else return obj;
}
function cloneObject(obj: any) {
	let result = {};
	let names = Object.getOwnPropertyNames(obj);
	for (let i = 0; i < names.length; i++) {
		result[names[i]] = clone(obj[names[i]]);
	}
	return result;
}
function cloneArray(obj: any) {
	let result = new Array(obj.length);
	for (let i = 0; i < result.length; i++) {
		result[i] = clone(obj[i]);
	}
	return result;
}

/**
 * 获取对象的 value 值
 * @param obj 要查询的对象
 * @param name 对象的 key 值 “a.b”
 * @call getValue({a: 1, b: {c: 3}}, 'b.c')  //--> 3
 */
export function getValue(obj: any, name: string) {
	if (!obj) return;
	let nameList = name.split('.');
	let temp = obj;
	for (let i = 0; i < nameList.length; i++) {
		if (temp[nameList[i]]) {
			temp = temp[nameList[i]];
		} else {
			return undefined;
		}
	}
	return temp;
}

/**
 * 设置对象 value 值
 * @param obj  PS: {}
 * @param propPath 要改变的 key 值  PS: a 或 b.c
 * @param value 设置 value
 */
export function setNestedPropertyValue(obj: AnyObj, propPath: string | string[], value: any) {
  if (typeof propPath === 'string') {
    propPath = propPath.split('.');
  }

  if (propPath.length > 1) {
    const prop = propPath.shift();
    obj[prop] = obj[prop] || {};
    setNestedPropertyValue(obj[prop], propPath, value);
  } else {
    obj[propPath[0]] = value;
  }
}

/**
 * 创建一个可连续赋值的对象
 * @returns 
 * @call const obj = createAnyObject(); obj.a.b.c = 123
 */
export function createAnyObject(target = {}) {
  let nowKey = '';
  return new Proxy(clone(target), {
		get(target, key, receiver) {
			if (typeof key !== 'string') {
				throw new TypeError('key 类型错误');
			}
			nowKey += '.' + key;
			setNestedPropertyValue(target, nowKey.slice(1), {});
			return receiver;
		},
		set(target, key, value, receiver) {
			if (typeof key !== 'string') {
				throw new TypeError('key 类型错误');
			}
			nowKey += '.' + key;
			setNestedPropertyValue(target, nowKey.slice(1), value);
			return receiver;
		}
	})
}

/**
 * 获取一个对象的字节大小
 * @param obj 
 * @returns 
 */
export function getLSUsedSpace(obj: any) {

  const length = Object.keys(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length + curKey.length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;

    return total;
  }, 0);

  const symbolLen = Object.getOwnPropertySymbols(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length;

    return total;
  }, 0);

  return length + symbolLen;
}

/**
 * object 转 formdata
 * @param object
 */
export function objectToFormData(object: AnyObj) {
	const formData = new FormData();
	Object.keys(object).forEach(key => {
		const value = object[key];
		if (Array.isArray(value)) {
			value.forEach((subValue, i) => formData.append(key + `[${i}]`, subValue))
		} else {
			formData.append(key, object[key]);
		}
	})
	return formData;
}
