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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * ???????????????
 * @param max ?????????????????????????????????????????????
 * @param min ?????????
 */
export function randomNum(max, min) {
    if (min === void 0) { min = 0; }
    return ~~(Math.random() * (max - min) + min);
}
/**
 * ??????????????????
 * @param args
 */
export function numberSum() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (s, item) { return s + item; }, 0);
}
/**
 * ???????????????
 */
export function createNum() {
    var n;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                n = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, n];
            case 2:
                _a.sent();
                n++;
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
/**
 * ??????????????????????????????(0.1 + 0.2 != 0.3)?????????
 * @param args
 * @returns
 */
export function fixedNumberAdd() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var intSum = 0, floatSum = 0;
    __spreadArray([], __read(args), false).forEach(function (val) {
        var _a;
        var int = String(val).split('.')[0]; // ????????????
        var float = (_a = String(val).split('.')[1]) !== null && _a !== void 0 ? _a : 0; // ????????????
        intSum += Number(int);
        floatSum += Number(float);
    });
    return Number(intSum + '.' + floatSum);
}
/**
 * ????????????
 * @param num ???????????????????????????????????????????????????
 * @param start ??????????????????
 * @param end ??????????????????
 */
export function numberEncrypt(num, start, end) {
    if (start === void 0) { start = 3; }
    if (end === void 0) { end = -4; }
    if (!Number(num))
        return;
    var password = '';
    var startNum = String(num).slice(0, start);
    var encryptLen = String(num).slice(start, end).length;
    var endNum = String(num).slice(end);
    for (var i = 0; i < encryptLen; i++) {
        password += '*';
    }
    return startNum + password + endNum;
}
/**
 * ?????????????????????????????????????????????
 * @param num ?????????
 * @param fixed ??????????????????
 * @returns
 */
export function toFixed2AndBankCount(num, fixed) {
    if (num === void 0) { num = ''; }
    if (fixed === void 0) { fixed = 2; }
    var str = String(num);
    var reg = /(?=(\B)(\d{3})+$)/g;
    if (str.includes('.')) {
        var index = str.indexOf('.');
        var int = str.slice(0, index); // ????????????
        var float = str.slice(index, index + fixed + 1); // ???????????????
        return int.replace(reg, ',') + float;
    }
    else {
        return str.replace(reg, ',');
    }
}
/**
 * ??????????????????
 * @param num
 * @param digit ???????????????
 * @returns
 */
export function numberPercentage(num, digit) {
    if (digit === void 0) { digit = 0; }
    if (!Number(num))
        return;
    return Math.abs(Number(num) * 100).toFixed(digit) + '%';
}
/**
 * ???????????????????????????
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
export function count2Spotlength(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
/**
 * ????????????
 * @param num ???????????? 9 ??? + 1
 * @returns
 */
export function reverseInteger(num) {
    var result = 0;
    while (num !== 0) {
        result = result * 10 + num % 10;
        // Math.trunc() ???????????????????????????????????????????????????????????????
        num = Math.trunc(num / 10);
    }
    if (result > Math.pow(2, 31) || result < -(Math.pow(2, 31)))
        return 0;
    return result;
}
/**
 * ?????????????????????
 * @param num
 * @returns
 */
export function numberToWords(num) {
    var result = toHundreds(num % 1000);
    var bigNumbers = ["Thousand", "Million", "Billion"];
    for (var i = 0; i < 3; ++i) {
        num = Math.trunc(num / 1000);
        result = num % 1000 !== 0 ? [toHundreds(num % 1000), bigNumbers[i], result].filter(Boolean).join(" ") : result;
    }
    return result.length === 0 ? "Zero" : result;
}
function toHundreds(num) {
    var numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    var result = Array(3).fill("");
    var a = Math.trunc(num / 100), b = num % 100, c = num % 10;
    result[0] = a > 0 && "".concat(numbers[a], " Hundred");
    result[1] = b < 20 ? numbers[b] : tens[Math.trunc(b / 10)];
    result[2] = b >= 20 && "".concat(numbers[c]);
    return result.filter(Boolean).join(" ");
}
