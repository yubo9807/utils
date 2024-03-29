/**
 * 获取 cookie 指定参数
 * @param {*} key 要获取的 key
 * @returns
 */
export declare function getCookie(key: string): Promise<any>;
/**
 * 求滚动轮滚动距离
 */
export declare const getScrollOffset: () => {
    x: any;
    y: any;
};
/**
 * 获取滚动条坐标
 * @param el
 */
export declare const getScrollPosition: (el?: any) => {
    x: any;
    y: any;
};
/**
 * 返回浏览器视口尺寸
 */
export declare const getViewportOffset: () => {
    x: any;
    y: any;
};
/**
 * 滚动条、锚链接（记得取消 a 标签默认事件）跳转过渡  默认回到顶部
 * @param ele 元素节点
 */
export declare const scrollTo: (ele?: any) => void;
/**
 * 劫持粘贴板
 * @param value 需要复制的字符
 */
export declare function copyToBoard(value: string | number): boolean;
/**
 * 禁止右键复制
 * @param arr contextmenu：选择 selectstart：右键 copy：复制]
 */
export declare const prohibitCopy: (arr?: string[]) => void;
/**
 * 禁止某些键盘事件
 */
export declare const prohibitKeydown: () => void;
/**
 * 检查当前浏览器是否在苹果设备上
 */
export declare const isAppleDevice: boolean;
/**
 * 判断浏览器类型
 */
export declare const browserType: () => "Opera" | "Firefox" | "Chrome" | "Safari" | "IE";
/**
 * 生成 formData 表单
 * @param {*} obj
 * @returns
 */
export declare function createFormData(obj: any): any;
