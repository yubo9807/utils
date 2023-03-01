import { isPromise } from "./judge";

declare const process;

/**
 * 异步执行一个函数
 * @param func 
 */
export function asyncExecute(func: Function) {
  if (typeof Promise !== void 0) {
    Promise.resolve().then(func as any);
  } else if (typeof MutationObserver !== void 0) {
    const ob = new MutationObserver(func as MutationCallback);
    const textNode = document.createTextNode('0');
    ob.observe(textNode, { characterData: true });
    textNode.data = '1';
  } else if (typeof process !== void 0) {
    process.nextTick(func);
  } else {
    setTimeout(func, 0);
  }
}

/**
 * 请求函数封装
 * @param promise 请求函数
 * @param errorExt 
 * @returns 
 */
export function asyncto(promise: Promise<any>, errorExt: string) {
  return promise
    .then(data => [ null, data ])
    .catch(err => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [ parsedError, null ];
      }
      return [ err, null ];
    })
}


interface Option {
  retries?: number,
  retryDelay?: number,
  retryTips?: Function
}
const defaultOption = {
  retries: 2,
  retryDelay: 500,
  retryTips: () => {}
}

/**
 * 请求重试
 * @param axios
 * @param option 配置项
 */
export default (axios, option: Option) => {

  option = Object.assign(defaultOption, option);

  axios.interceptors.request.use((config) => {
    return config;
  });
  
  // 请求出现错误
  axios.interceptors.response.use(null, async(error) => {

    const { config, response } = error;
    if (!config) return Promise.reject(error);
    if (response) return Promise.resolve(response);  // 针对后端那些把业务错误报在 error 中的人

    config.retryCount ||= 0;
    config.retryCount ++;

    return new Promise((resolve, reject) => {
      setTimeout(async() => {
        if (config.retryCount >= option.retries) return reject(config);
        else {
          option.retryTips && option.retryTips();  // 再次请求时你可以给用户些提示
          return resolve(await axios(config));  // 再次请求
        }
      }, option.retryDelay)
    })
  });

}

/**
 * fetch 超时取消请求
 * @param time 超时时长
 * @returns fetch()
 */
export function fetchTimeout(time: number) {
  return (input: RequestInfo | URL, options: RequestInit = {}) => {
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, time)
    return fetch(input, options);
  }
}


type PromiseFn = (...args: any[]) => Promise<any>

export class ProcessTasks {
  isRuning = false;  // 是否在运行中
  #tasks   = null;   // 任务队列
  #i       = 0;      // 执行队列下标

  /**
   * 执行任务队列
   * 如果其中一个任务失败，返回失败结果，后续任务都不会执行
   * 在执行过程中或执行前可追加任务
   * 若在整个执行结束后追加了任务，请重新执行 start
   * @param tasks ...args 任务队列
   */
  constructor(...tasks: Array<PromiseFn | Function>) {
    this.#tasks = tasks;
  }

  /**
   * 开始/继续 执行任务
   * @returns 暂停～开始～暂停/结束 的每项任务的返回结果
   */
  start = () => {
    if (this.#tasks === null) {
      console.warn('执行队列被提前回收');
      return;
    }
    this.isRuning = true;
    return new Promise(async (resolve, reject) => {
      await this.#execute().then(res => resolve(res));
    });
  }

  /**
   * 递归执行队列
   * @param results 收集返回值
   * @returns 
   */
  #execute = async (results = []) => {
    if (!this.isRuning) return;  // 被暂停，结束循环
    const len = this.#tasks.length;
    if (this.#i === len - 1) this.isRuning = false;  // 执行到最后一个任务，暂停任务

    const result = this.#tasks[this.#i]();
    this.#i ++;
    if (isPromise(result)) {
      return await result.then(async res => {
        return await handleResult.call(this, res);
      }).catch(err => {
        this.isRuning = false;
        return Promise.reject(err);
      });
    } else {
      return await handleResult.call(this, result);
    }

    async function handleResult(res) {
      results.push(res);
      if (this.#tasks.length > len) {
        this.isRuning = true;  // 发现中途有队列推送，继续递归执行
        return await this.#execute(results);
      }
      if (!this.isRuning) {
        return Promise.resolve(results);
      } else {
        return await this.#execute(results);
      }
    }
  }

  /**
   * 暂停 任务执行
   */
  pause = () => {
    this.isRuning = false;
  }

  /**
   * 追加任务
   * @param fn 
   */
  push = (fn: PromiseFn | Function) => {
    this.#tasks.push(fn);
  }

  /**
   * 使用结束后，将任务队列从内存中回收
   */
  recycle = () => {
    if (this.isRuning) {
      console.warn('队列正在执行中，禁止回收');
      return;
    };
    this.#tasks = null;
  }

}
