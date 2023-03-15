
/**
 * 不能是某种类型
 */
export type BanType<T, E> = T extends E ? never : T
// function fn<T>(a: BanType<T, Date>) {}

/**
 * 任意类型对象
 */
export type AnyObj = {
  [prop: string | number | symbol]: any
}

/**
 * 可选对象
 */
export type OptionalObj<T> = {
  [prop in keyof T]?: T[prop]
}

/**
 * 异步函数
 */
export type PromiseFn = (...args: any[]) => Promise<any>
