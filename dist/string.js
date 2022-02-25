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
 * 生成重复字符串
 * @param str 传入字符串
 * @param n 重复次数
 */
export var cerateRepeatStr = function (str, n) {
    if (n === void 0) { n = 1; }
    var num = Math.abs(n), res = ''; // 防止传入负数，造成死循环
    while (num) {
        num % 2 === 1 && (res += str);
        num > 1 && (str += str);
        num >>= 1; // 左位移1位
    }
    return res;
};
/**
 * 反转字符串
 * @param str
 * @returns
 */
export var reverseStr = function (str) { return str.split('').reverse().join(''); };
/**
 * 计算字符串字节长度
 * @param str 传入字符串
 */
export var strBytesLength = function (str) {
    var len = str.length, i = 0;
    while (i < len) {
        str.charCodeAt(i) > 255 && len++; // .charCodeAt() 返回指定位置的字符的 Unicode 编码
        i++;
    }
    return len;
};
/**
 * 求一个字符串的 ascll 总和
 * @param str
 */
export var stringAscllSum = function (str) {
    var arr = str.split('');
    var num = 0;
    arr.forEach(function (val) {
        num += val.charCodeAt(0);
    });
    return num;
};
/**
 * 版本号比较
 * @param v1 版本号1
 * @param v2 版本号2
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1
 */
export var compareVersion = function (v1, v2) {
    if (!v1 && !v2)
        return 0;
    if (!v1)
        return -1;
    if (!v2)
        return 1;
    var v1Stack = v1.split('.');
    var v2Stack = v2.split('.');
    var maxLen = Math.max(v1Stack.length, v2Stack.length);
    for (var i = 0; i < maxLen; i++) {
        // 必须转整，否则按照字符顺序比较大小
        var prevVal = ~~v1Stack[i];
        var currVal = ~~v2Stack[i];
        if (prevVal > currVal)
            return 1;
        if (prevVal < currVal)
            return -1;
    }
    return 0;
};
/**
 * 金额大些转换
 * @param num 字符串类型数字
 * @returns
 */
export function digitUppercase(num) {
    if (num === void 0) { num = ''; }
    if (num === '')
        return '';
    if (isNaN(Number(num)))
        return '无效金额字符';
    if (num.length > 80)
        return '金额过大';
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var minUnits = ['', '拾', '佰', '仟'];
    var maxUnits = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由它', '不可思议', '无量', '大数', '古戈尔'];
    var floatUnits = ['角', '分', '厘', '毫', '丝'];
    var money = '', small = '';
    var int = '', float = '';
    if (/\./.test(num)) {
        int = num.split('.')[0]; // 整数位
        float = num.split('.')[1].slice(0, 5); // 浮点数位，只取前 5 位
        // 处理小数部分
        Array.apply(void 0, __spreadArray([], __read(float), false)).forEach(function (val, index) {
            if (val === '0')
                small += digit[val];
            else
                small += digit[val] + floatUnits[index];
        });
        small = small.replace(/零+/, '零'); // 替换 '零...'
        small = small.replace(/零$/, ''); // 去掉以 '零' 结尾字符
    }
    else {
        int = num;
    }
    int = int.replace(/^0+/, ''); // 去掉以 '0...' 开头的数字
    var reg = /(?=(\B)(\d{4})+$)/g; // 每 4 位为一组，用 ',' 隔开
    var arr = int.replace(reg, ',').split(',');
    var len = arr.length;
    arr.forEach(function (item, i) {
        var str = '';
        if (/^0000$/.test(item))
            return money; // 都是 0 的情况下啥都不管
        var length = item.length;
        item = item.replace(/0+$/, ''); // 去除尾部0， 1200 -> 12
        Array.apply(void 0, __spreadArray([], __read(item), false)).forEach(function (val, index) {
            if (val === '0')
                str += digit[val]; // 为 0 时后面不加单位
            else
                str += digit[val] + minUnits[length - index - 1];
        });
        str = str.replace(/零+/, '零'); // '零零...' 替换为 '零'
        money += str + maxUnits[len - i - 1]; // 把每一项加起来
        money || (money = '零');
    });
    if (small) {
        return money + '元' + small;
    }
    else {
        return money + '元整';
    }
}
/**
 * HTML 转 AST 语法树
 * @param html
 * @returns 返回 AST 语法树
 */
export var parseHtml = function (html) {
    if (html === void 0) { html = ''; }
    var startTagOpen = /^<([a-zA-Z\d]+)/; // 匹配标签<div>、<br/>等标签的开始部分"<div、<br"
    var startTagClose = /^\s*(\/?)>/; // 匹配标签<div>、<br/>等标签的闭合部分">、/>"
    var attribute = /^\s*([\w-]+)(?:="([^"]*)")?\s*/; // 匹配属性
    var endTag = /^<\/([a-zA-Z\d]+)>/; // 匹配闭合标签，例如</div>、</p>
    var stack = [];
    var nodes = [];
    while (html) {
        // 查找<的起始位置
        var index = html.indexOf('<');
        if (index === 0) {
            // 先匹配整体结束标签，例如</div>、</p>
            var endTagMatch = html.match(endTag);
            if (endTagMatch) {
                if (stack[stack.length - 1]) {
                    if (stack[stack.length - 1].tag === endTagMatch[1]) {
                        // 出栈
                        stack.pop();
                        advanced(endTagMatch[0].length);
                        continue;
                    }
                    else {
                        throw new Error("\u8D77\u59CB\u6807\u7B7E\u548C\u7ED3\u675F\u6807\u7B7E\u4E0D\u5339\u914D: \u8D77\u59CB\u6807\u7B7E\uFF08".concat(stack[stack.length - 1].tag, "\uFF09\uFF0C\u7ED3\u675F\u6807\u7B7E\uFF08").concat(endTagMatch[0], "\uFF09"));
                    }
                }
                else {
                    throw new Error("".concat(endTagMatch[0], "\u6CA1\u6709\u8D77\u59CB\u6807\u7B7E"));
                }
            }
            // 然后匹配起始标签的开始部分，例如<div>的<div、<p>的<p、<br/>的<br
            var startTagOpenMatch = html.match(startTagOpen);
            if (startTagOpenMatch) {
                var node = {
                    nodeType: 1,
                    tag: startTagOpenMatch[1],
                    attrs: [],
                    children: []
                };
                advanced(startTagOpenMatch[0].length);
                var end = void 0, attr = void 0;
                // 匹配标签属性列表
                while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                    advanced(attr[0].length);
                    node.attrs.push({
                        name: attr[1],
                        value: attr[2]
                    });
                }
                // 匹配起始标签的结束部分
                if (end) {
                    if (stack.length === 0)
                        nodes.push(node);
                    else
                        stack[stack.length - 1].children.push(node);
                    // 自闭和标签不加入栈中
                    if (end[1] !== '/')
                        stack.push(node);
                    advanced(end[0].length);
                }
            }
        }
        else {
            // 文本
            var node = {
                nodeType: 3,
                textContent: html.slice(0, index)
            };
            if (stack.length === 0)
                nodes.push(node);
            else
                stack[stack.length - 1].children.push(node);
            advanced(node.textContent.length);
        }
    }
    function advanced(n) {
        html = html.substring(n);
    }
    return nodes;
};
// parseHtml('<div id="test" class="a b"></div>');
/**
 * 生成随机id
 * @param {*} length
 * @param {*} chars
 */
export function uuid(length, chars) {
    if (length === void 0) { length = 8; }
    if (chars === void 0) { chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; }
    var result = '';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
