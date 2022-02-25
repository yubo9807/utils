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
 * 请求函数封装
 * @param promise 请求函数
 * @param errorExt
 * @returns
 */
export function asyncto(promise, errorExt) {
    return promise
        .then(function (data) { return [null, data]; })["catch"](function (err) {
        if (errorExt) {
            var parsedError = Object.assign({}, err, errorExt);
            return [parsedError, undefined];
        }
        return [err, undefined];
    });
}
var defaultOption = {
    retries: 2,
    retryDelay: 500,
    retryTips: function () { }
};
/**
 * 请求重试
 * @param axios
 * @param option 配置项
 */
export default (function (axios, option) {
    option = Object.assign(defaultOption, option);
    axios.interceptors.request.use(function (config) {
        return config;
    });
    // 请求出现错误
    axios.interceptors.response.use(null, function (error) { return __awaiter(void 0, void 0, void 0, function () {
        var config, response;
        return __generator(this, function (_a) {
            config = error.config, response = error.response;
            if (!config)
                return [2 /*return*/, Promise.reject(error)];
            if (response)
                return [2 /*return*/, Promise.resolve(response)]; // 针对后端那些把业务错误报在 error 中的人
            config.retryCount || (config.retryCount = 0);
            config.retryCount++;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(config.retryCount >= option.retries)) return [3 /*break*/, 1];
                                    return [2 /*return*/, reject(config)];
                                case 1:
                                    option.retryTips && option.retryTips(); // 再次请求时你可以给用户些提示
                                    _a = resolve;
                                    return [4 /*yield*/, axios(config)];
                                case 2: // 再次请求时你可以给用户些提示
                                return [2 /*return*/, _a.apply(void 0, [_b.sent()])]; // 再次请求
                            }
                        });
                    }); }, option.retryDelay);
                })];
        });
    }); });
});
