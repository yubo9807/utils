var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * 获取 cookie 指定参数
 * @param {*} key 要获取的 key
 * @returns
 */
export function getCookie(key) {
    return __awaiter(this, void 0, void 0, function () {
        var obj_1, cookie, str, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof cookieStore === 'object')) return [3 /*break*/, 2];
                    return [4 /*yield*/, cookieStore.get(key)];
                case 1:
                    obj_1 = _a.sent();
                    return [2 /*return*/, obj_1 === null || obj_1 === void 0 ? void 0 : obj_1.value];
                case 2:
                    cookie = document.cookie;
                    str = cookie.replace(/\s/g, '');
                    obj = {};
                    str.split(';').forEach(function (val) {
                        obj[val.split('=')[0]] = val.split('=')[1];
                    });
                    return [2 /*return*/, obj[key]];
            }
        });
    });
}
/**
 * 求滚动轮滚动距离
 */
export var getScrollOffset = function () {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    }
    else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        };
    }
};
/**
 * 获取滚动条坐标
 * @param el
 */
export var getScrollPosition = function (el) {
    if (el === void 0) { el = window; }
    return ({
        x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
        y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
    });
};
/**
 * 返回浏览器视口尺寸
 */
export var getViewportOffset = function () {
    if (window.innerWidth) {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        };
    }
    else {
        if (document.compatMode === "BackCompt") { // 判断是否为混杂模式
            return {
                x: document.body.clientWidth,
                y: document.body.clientHeight
            };
        }
        else {
            return {
                x: document.documentElement.clientWidth,
                y: document.documentElement.clientHeight
            };
        }
    }
};
/**
 * 滚动条、锚链接（记得取消 a 标签默认事件）跳转过渡  默认回到顶部
 * @param ele 元素节点
 */
export var scrollTo = function (ele) {
    if (ele === void 0) { ele = {}; }
    var num = ele.offsetTop || 0;
    window.scrollTo({
        top: num,
        behavior: "smooth"
    });
};
/**
 * 劫持粘贴板
 * @param value 需要复制的字符
 */
export function copyToBoard(value) {
    var element = document.createElement('textarea');
    document.body.appendChild(element);
    element.value = value;
    element.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
        document.body.removeChild(element);
        return true;
    }
    document.body.removeChild(element);
    return false;
}
/**
 * 禁止右键复制
 * @param arr contextmenu：选择 selectstart：右键 copy：复制]
 */
export var prohibitCopy = function (arr) {
    if (arr === void 0) { arr = ['selectstart', 'copy']; }
    arr.forEach(function (ev) {
        document.addEventListener(ev, function (event) {
            return event.returnValue = false;
        });
    });
};
/**
 * 禁止某些键盘事件
 */
export var prohibitKeydown = function () {
    document.addEventListener('keydown', function (event) {
        return !(112 == event.keyCode || //F1
            123 == event.keyCode || //F12
            event.ctrlKey && 82 == event.keyCode || //ctrl + R
            event.ctrlKey && 78 == event.keyCode || //ctrl + N
            event.shiftKey && 121 == event.keyCode || //shift + F10
            event.altKey && 115 == event.keyCode || //alt + F4
            "A" == event.srcElement.tagName && event.shiftKey //shift + 点击a标签
        ) || (event.returnValue = false);
    });
};
// 采集JS Error
window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObj) {
    var errorStack = errorObj ? errorObj.stack : null;
    // 这里进行上报
    console.log(errorMsg, url, lineNumber, columnNumber, errorStack);
};
window.onunhandledrejection = function (e) {
    var errorMsg = "", errorStack = "";
    if (typeof e.reason === "object") {
        errorMsg = e.reason.message;
        errorStack = e.reason.stack;
    }
    else {
        errorMsg = e.reason;
    }
    // 这里进行上报
    console.log(errorMsg, errorStack);
};
/**
 * 检查当前浏览器是否在苹果设备上
 */
export var isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
/**
 * 判断浏览器类型
 */
export var browserType = function () {
    var userAgent = window.navigator.userAgent; // 取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera";
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }
    ; //判断是否IE浏览器
};
