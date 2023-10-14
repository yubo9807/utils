import { WideClass } from "./type";

/**
 * 将类变为单例
 * @param className 
 * @returns 
 */
export function singleton(className: WideClass) {
  let ins = null;
  return new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = new target(...args)
      }
      return ins;
    }
  })
}

export class MemoizeMap {
  #map     = new Map();
  #weakMap = new WeakMap();
  constructor() {}

  _isObject(v: unknown) {
    return typeof v === 'object' && v !== null;
  }

  set(key, value) {
    if (this._isObject(key)) {
      this.#weakMap.set(key, value);
    } else {
      this.#map.set(key, value);
    }
  }

  get(key) {
    if (this._isObject(key)) {
      this.#weakMap.get(key);
    } else {
      this.#map.get(key);
    }
  }

  has(key) {
    if (this._isObject(key)) {
      this.#weakMap.has(key);
    } else {
      this.#map.has(key);
    }
  }
}
