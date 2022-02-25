export declare function loadScript(url: string, cb: Function, isMoudule: boolean): void;
/**
 * 程序阻塞多长时间
 * @param time
 */
export declare function choke(time?: number): void;
/**
 * 节流
 * @param handler
 * @param wait
 * @returns
 */
export declare const throttle: (handler: () => void, wait: number) => () => void;
/**
 * 防抖
 * @param handler
 * @param delay
 * @returns
 */
export declare function debounce(handler: () => void, delay: number): () => void;
