/**
 * 判断数字是否是一个基数
 * @param num 
 * @returns 
 */
export function isOdd(num: number) {
  // -3 / 2 = -1.5
  return num / 2 === 1 || num % 2 === -1;
}

/**
 * 判断一个数是否为偶数
 * @param num
 * @returns
 */
export function isEven(num: number) {
  const c = num / 2;
  return c / Math.floor(c) === 1 || c === 0;
}

/**
 * 求模
 * @param x 
 * @param y 
 * @returns 
 */
export function mod(x: number, y: number) {
  // 在取余运算中，余数的符号和x（被除数）相同
  // 在取余运算中，余数的符号和x（除数）相同
  x = Math.abs(x);
  const c = Math.floor(x / Math.abs(y));
  const m = x - c * Math.abs(y);
  return y >= 0 ? m : -m;
}

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
export function* createNum() {
  let n = 0
  while (true) {
    yield n;
    n++;
  }
}

/**
 * 将 rgb 颜色灰度化（基于光感加权平均）
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
export function grayColor(r: number, g: number, b: number) {
  return .2126 * r + .7152 * g + .0722 * b;
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

/**
 * 计算元素中的一个点的角度（坐标轴中心即元素中心）
 * @param width  元素宽度（px） 
 * @param height 元素高度（px）
 * @param x      offsetX
 * @param y      offsetY
 * @returns
 */
export function elPointDegree(width: number, height: number, x: number, y: number) {
  return pointDegree(x - width / 2, y - height / 2);
}

/**
 * 计算一个点的角度（坐标轴中心：(0,0)）
 * @param x 基于象限的 x 坐标
 * @param y 基于象限的 y 坐标
 * @returns
 */
export function pointDegree(x: number, y: number) {
  if (y <= 0) {
    return Math.abs(Math.atan2(y, x) * 180 / Math.PI);
  } else {
    return Math.abs(Math.atan2(y, -x) * 180 / Math.PI) + 180;
  }
}

/**
 * 计算字节大小
 * @param {*} num
 * @param {*} utils
 * @returns
 */
export function calculateByte(num = 0, utils = ['B', 'KB', 'MB', 'GB', 'TB']) {
  const len = utils.length;
  let str = '';
  if (num < 1024) str = num + utils[0];
  for (let i = 1; i < len; i++) {
    if (num > 1024 ** i) str = Math.ceil(num / (1024 ** i)) + utils[i];
  }
  return str;
}
