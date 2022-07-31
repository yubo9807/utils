/**
 * 生成随机数
 * @param max 最大值（取不到，只可取正整数）
 * @param min 最小值
 */
export function randomNum(max: number, min: number = 0) {
    return ~~(Math.random() * (max - min) + min);
}

/**
 * 整数数字求和
 * @param args
 */
export function numberSum(...args: number[]) {
    return args.reduce((s, item) => s + item, 0)
}

/**
 * 数字生成器
 * @call const iter = createNum(); iter.next().value;
 */
export function* createNum() {  // 生成器函数传参毫无意义
    let n = 0
    while (true) {
        yield n;
        n++;
    }
}

/**
 * 浮点数数字求和，解决(0.1 + 0.2 != 0.3)的问题
 * @param args 
 * @returns 
 */
export function fixedNumberAdd(...args: number[]) {
    let intSum = 0, floatSum = 0;
    [...args].forEach((val: number) => {
        const int = String(val).split('.')[0];  // 整数部位
        const float = String(val).split('.')[1] ?? 0;  // 小数部位
        intSum += Number(int);
        floatSum += Number(float);
    });
    return Number(intSum + '.' + floatSum);
}

/**
 * 数字加密
 * @param num 手机号，银行卡号之类的数组或字符串
 * @param start 开始加密索引
 * @param end 结束加密索引
 */
export function numberEncrypt(num: number | string, start = 3, end = -4) {
    if (!Number(num)) return;
    let password = '';
    const startNum = String(num).slice(0, start);
    const encryptLen = String(num).slice(start, end).length;
    const endNum = String(num).slice(end);
    for (let i = 0; i < encryptLen; i++) {
        password += '*';
    }
    return startNum + password + endNum;
}

/**
 * 截取两位小数并进行银行计数转换
 * @param num 一个数
 * @param fixed 保留几位小数
 * @returns
 */
export function toFixed2AndBankCount(num: string | number = '', fixed = 2) {
    const str = String(num);
    const reg = /(?=(\B)(\d{3})+$)/g;
    if (str.includes('.')) {
        const index = str.indexOf('.');
        const int = str.slice(0, index);  // 整数部分
        const float = str.slice(index, index + fixed + 1);  // 浮点数部分
        return int.replace(reg, ',') + float;
    } else {
        return str.replace(reg, ',');
    }
}

/**
 * 小数转百分比
 * @param num 
 * @param digit 保留小数位
 * @returns 
 */
export function numberPercentage(num: number | string, digit = 0) {
    if (!Number(num)) return;
    return Math.abs(Number(num) * 100).toFixed(digit) + '%';
}

/**
 * 计算两点之间的距离
 * @param x1 
 * @param y1 
 * @param x2 
 * @param y2 
 * @returns 
 */
export function count2Spotlength(x1: number, y1: number, x2: number, y2: number) {
    return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * 反转整数
 * @param num 最大限制 9 位 + 1
 * @returns 
 */
export function reverseInteger(num: number) {
    let result = 0;
    while (num !== 0) {
        result = result * 10 + num % 10;
        // Math.trunc() 方法会将数字的小数部分去掉，只保留整数部分
        num = Math.trunc(num / 10);
    }

    if (result > 2 ** 31 || result < -(2 ** 31)) return 0;
    return result;
}

/**
 * 整数转英文单词
 * @param num 
 * @returns 
 */
export function numberToWords(num: number) {
    let result = toHundreds(num % 1000);
    const bigNumbers = ["Thousand", "Million", "Billion"];
    for (let i = 0; i < 3; ++i) {
        num = Math.trunc(num / 1000);
        result = num % 1000 !== 0 ? [toHundreds(num % 1000), bigNumbers[i], result].filter(Boolean).join(" ") : result;
    }
    return result.length === 0 ? "Zero" : result;
}

function toHundreds(num: number) {
    const numbers = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const result = Array(3).fill("");
    let a = Math.trunc(num / 100), b = num % 100, c = num % 10;
    result[0] = a > 0 && `${numbers[a]} Hundred`;
    result[1] = b < 20 ? numbers[b] : tens[Math.trunc(b / 10)]
    result[2] = b >= 20 && `${numbers[c]}`;
    return result.filter(Boolean).join(" ");
}

/**
 * 判断 x 是否是 2 的 n 次方
 * @param x 
 * @returns 
 */
export function isPowerOf2(x: number) {
    if (x <= 0) return false;
    return (x & (x - 1)) === 0;
}