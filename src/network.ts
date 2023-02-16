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
function fetchTimeout(time: number) {
  return (input: RequestInfo | URL, options: RequestInit = {}) => {
    const controller = new AbortController();
    options.signal = controller.signal;
    setTimeout(() => {
      controller.abort();
    }, time)
    return fetch(input, options);
  }
}