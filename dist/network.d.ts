/**
 * 请求函数封装
 * @param promise 请求函数
 * @param errorExt
 * @returns
 */
export declare function asyncto(promise: Promise<any>, errorExt: string): Promise<any[]>;
interface Option {
    retries?: number;
    retryDelay?: number;
    retryTips?: Function;
}
declare const _default: (axios: any, option: Option) => void;
/**
 * 请求重试
 * @param axios
 * @param option 配置项
 */
export default _default;
