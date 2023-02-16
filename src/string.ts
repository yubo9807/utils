/**
 * 生成重复字符串
 * @param str 传入字符串
 * @param n 重复次数
 */
export function cerateRepeatStr(str: string, n: number = 1) {
	let num = Math.abs(n), res = '';  // 防止传入负数，造成死循环
	while (num) {
		num % 2 === 1 && (res += str);
		num > 1 && (str += str);

		num >>= 1;  // 左位移1位
	}
	return res;
}

/**
 * 反转字符串
 * @param str 
 * @returns 
 */
export function reverseStr(str: string) {
	return str.split('').reverse().join('');
}

/**
 * 计算字符串字节长度
 * @param str 传入字符串
 */
export function strBytesLength(str: string) {
	let len = str.length, i = 0;
	while (i < len) {
		str.charCodeAt(i) > 255 && len++;  // .charCodeAt() 返回指定位置的字符的 Unicode 编码
		i++;
	}
	return len;
}

/**
 * 求一个字符串的 ascll 总和
 * @param str 
 */
export function stringAscllSum(str: string) {
	const arr = str.split('');
	let num = 0;
	arr.forEach(val => {
		num += val.charCodeAt(0);
	})
	return num;
}

/**
 * 版本号比较
 * @param v1 版本号1
 * @param v2 版本号2
 * @returns 如果版本号相等，返回 0, 如果第一个版本号低于第二个返回 -1，否则返回 1
 */
export const compareVersion = (v1: string, v2: string) => {
	if (!v1 && !v2) return 0;
	if (!v1) return -1;
	if (!v2) return 1;
	const v1Stack = v1.split('.');
	const v2Stack = v2.split('.');
	const maxLen = Math.max(v1Stack.length, v2Stack.length);
	for (let i = 0; i < maxLen; i++) {
		// 必须转整，否则按照字符顺序比较大小
		const prevVal = ~~v1Stack[i];
		const currVal = ~~v2Stack[i];
		if (prevVal > currVal) return 1;
		if (prevVal < currVal) return -1;
	}
	return 0;
}

/**
 * 依次获取版本号值
 * @param str 版本号
 * @call const iter = walkVersion('1.0.0');
 */
export function* walkVersion(str: string) {
	const terminals = ['.', '-'];
	let part = '';
	for (let i = 0; i < str.length; i++) {
		const value = str[i];
		if (terminals.includes(value)) {
			yield part;
			part = '';
		} else {
			part += value;
		}
	}
	if (part) yield part;
}

/**
 * 金额大写转换
 * @param num 字符串类型数字
 * @returns 
 */
export function digitUppercase(num: string = '') {
	if (num === '') return '';
	if (isNaN(Number(num))) return '无效金额字符';
	if (num.length > 80) return '金额过大';

	const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	const minUnits = ['', '拾', '佰', '仟'];
	const maxUnits = ['', '万', '亿', '兆', '京', '垓', '杼', '穰', '沟', '涧', '正', '载', '极', '恒河沙', '阿僧祇', '那由它', '不可思议', '无量', '大数', '古戈尔'];
	const floatUnits = ['角', '分', '厘', '毫', '丝'];
	let money = '', small = '';

	let int = '', float = '';
	if (/\./.test(num)) {
		int = num.split('.')[0];  // 整数位
		float = num.split('.')[1].slice(0, 5);  // 浮点数位，只取前 5 位

		// 处理小数部分
		Array(...float).forEach((val, index) => {
			if (val === '0') small += digit[val];
			else small += digit[val] + floatUnits[index];
		})
		small = small.replace(/零+/, '零');  // 替换 '零...'
		small = small.replace(/零$/, '');  // 去掉以 '零' 结尾字符
	} else {
		int = num;
	}

	int = int.replace(/^0+/, '');  // 去掉以 '0...' 开头的数字

	const reg = /(?=(\B)(\d{4})+$)/g;  // 每 4 位为一组，用 ',' 隔开
	const arr = int.replace(reg, ',').split(',');
	const len = arr.length;
	arr.forEach((item, i) => {
		let str = '';

		if (/^0000$/.test(item)) return money;  // 都是 0 的情况下啥都不管

		const length = item.length;

		item = item.replace(/0+$/, '');  // 去除尾部0， 1200 -> 12

		Array(...item).forEach((val, index) => {
			if (val === '0') str += digit[val];  // 为 0 时后面不加单位
			else str += digit[val] + minUnits[length - index - 1];
		})
		str = str.replace(/零+/, '零');  // '零零...' 替换为 '零'

		money += str + maxUnits[len - i - 1];  // 把每一项加起来
		money ||= '零'
	})

	if (small) {
		return money + '元' + small;
	} else {
		return money + '元整';
	}
}

/**
 * HTML 转 AST 语法树
 * @param html
 * @returns 返回 AST 语法树
 */
export function parseHtml(html: string = '') {
	const startTagOpen = /^<([a-zA-Z\d]+)/;  // 匹配标签<div>、<br/>等标签的开始部分"<div、<br"
	const startTagClose = /^\s*(\/?)>/;  // 匹配标签<div>、<br/>等标签的闭合部分">、/>"
	const attribute = /^\s*([\w-]+)(?:="([^"]*)")?\s*/;  // 匹配属性
	const endTag = /^<\/([a-zA-Z\d]+)>/;  // 匹配闭合标签，例如</div>、</p>

	const stack: any = [];
	const nodes: any = [];

	while (html) {
		// 查找<的起始位置
		const index = html.indexOf('<');
		if (index === 0) {
			// 先匹配整体结束标签，例如</div>、</p>
			let endTagMatch = html.match(endTag);
			if (endTagMatch) {
				if (stack[stack.length - 1]) {
					if (stack[stack.length - 1].tag === endTagMatch[1]) {
						// 出栈
						stack.pop();
						advanced(endTagMatch[0].length);
						continue;
					} else {
						throw new Error(`起始标签和结束标签不匹配: 起始标签（${stack[stack.length - 1].tag}），结束标签（${endTagMatch[0]}）`);
					}
				} else {
					throw new Error(`${endTagMatch[0]}没有起始标签`);
				}
			}

			// 然后匹配起始标签的开始部分，例如<div>的<div、<p>的<p、<br/>的<br
			let startTagOpenMatch = html.match(startTagOpen);
			if (startTagOpenMatch) {
				const node: any = {
					nodeType: 1,
					tag: startTagOpenMatch[1],
					attrs: [],
					children: [],
				};
				advanced(startTagOpenMatch[0].length);
				let end: (string | any[])[] | null, attr: any[] | null;
				// 匹配标签属性列表
				while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
					advanced(attr[0].length);
					node.attrs.push({
						name: attr[1],
						value: attr[2],
					});
				}

				// 匹配起始标签的结束部分
				if (end) {
					if (stack.length === 0) nodes.push(node);
					else stack[stack.length - 1].children.push(node);

					// 自闭和标签不加入栈中
					if (end[1] !== '/') stack.push(node);

					advanced(end[0].length);
				}
			}
		} else {
			// 文本
			const node = {
				nodeType: 3,
				textContent: html.slice(0, index)
			};

			if (stack.length === 0) nodes.push(node);
			else stack[stack.length - 1].children.push(node);

			advanced(node.textContent.length);
		}
	}

	function advanced(n: number) {
		html = html.substring(n);
	}
	return nodes;
}
// parseHtml('<div id="test" class="a b"></div>');

/**
 * 生成随机id
 * @param length
 * @param chars
 */
export function uuid(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
	let result = '';
	for (let i = length; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}


interface ConversionOption {
	keywords?: string[]
	reg?: {
		[key in string]?: RegExp
	}
}

const defaultOption: ConversionOption = {
	// 关键字
	keywords: ['rule', 'end', 'knowledgebase', 'knowledge', 'reg', 'require', 'prohibit', 'and', 'or', 'in', 'true', 'false'],

	// 正则
	reg: {
		// 多行注释
		multiRowComment: /\/\*.*?\*\//gs,

		// 单行注释
		singleLineComment: /\/\/[^\n]+\n/g,

		// 换行字符串

		// 字符串
		string: /"[^"]*"/g,

		// 数字
		number: /\d*\.?\d+/g,

		// 方法
		methods: /\w+(?=\()/g,

		// 对象
		object: /\w*\./sg,
	}
}

/**
 * 自定义代码高亮（样式需自己填充）
 * @param text 代码块
 * @param option
 * @returns 
 */
export function codeConversion(text: string, option: ConversionOption = {}) {
	option = Object.assign({}, defaultOption, option);
	const { reg } = option;

	class Conversion {

		textList: any[]
		constructor(text) {
			this.textList = [{ content: text }];
		}

		/**
		 * 公共方法，截断匹配到的正则，处理后重新赋值给 this.textList
		 * @param {RegExp} reg 匹配正则
		 * @param {String} className 添加类名
		 * @param {Null | Array} splice 长度为3的数组，对匹配后的值进行修改（与数组方法 splice 一致）
		 */
		commonDealWith(reg, className = '', splice = null) {
			const arr = Object.assign([], this.textList);
			const record = [];
			arr.forEach((val, index) => {
				if (val.delaWith) return;

				const noMatching = val.content.split(reg).map(val => ({ content: val }));
				const matching = val.content.match(reg);
				if (!matching) return;

				let insert = 1;
				matching.forEach(val => {
					const content = `<span class="${className}">${splice ? val.slice(splice[0], splice[1]) : val}</span>${splice ? splice[2] : ''}`;
					noMatching.splice(insert, 0, { delaWith: true, content });
					insert += 2;
				})

				record.push([index, noMatching.length, noMatching]);
			})
			record.forEach((val, index, self) => {
				if (index > 0) {
					const len = self[index - 1][1] - 1;
					val[0] = val[0] + len;
					val[1] = val[1] + len;
				}
				arr.splice(val[0], 1, ...val[2]);
			})
			this.textList = arr;
			return this;
		}

		/**
		 * 处理关键字
		 */
		keyword(words) {
			const arr = Object.assign([], this.textList);
			const record = [];
			arr.forEach((val, index) => {
				if (val.delaWith) return;

				const reg = eval(`/(${words.join('|')})(?=\\s)/g`);
				const newArr = val.content.split(reg);
				newArr.forEach((val, index) => words.includes(val) && newArr.splice(index, 1));
				const noMatching = newArr.map(val => ({ content: val }));

				const matching = val.content.match(reg);
				if (!matching) return;

				let insert = 1;
				matching.forEach(val => {
					noMatching.splice(insert, 0, { delaWith: true, content: `<span class="keyword">${val}</span>` });
					insert = insert + 2;
				})

				record.push([index, noMatching.length, noMatching]);
			})
			record.forEach((val, index, self) => {
				if (index > 0) {
					const len = self[index - 1][1] - 1;
					val[0] = val[0] + len;
					val[1] = val[1] + len;
				}
				arr.splice(val[0], 1, ...val[2]);
			})

			this.textList = arr;
			return this;
		}


		/**
		 * 合并成html
		 */
		merge() {
			const html = this.textList.map(val => val.content).join('');
			return `<div class="code-highlight-container">${html}</div>`;
		}

	}

	const conversion = new Conversion(text);
	try {
		return conversion.commonDealWith(reg.multiRowComment, 'block-comment')
			.commonDealWith(reg.singleLineComment, 'line-comment')
			.commonDealWith(reg.string, 'string')
			.commonDealWith(reg.number, 'number')
			.keyword(option.keywords)
			.commonDealWith(reg.methods, 'methods')
			.commonDealWith(reg.object, 'object')
			.merge();
	} catch (error) {
		console.error(error);
		return text;
	}
}

/**
 * 评分
 * @param r 
 * @returns 
 * @call rate(3) --> 11100
 */
export function rate(r: number) {
	return '1111100000'.slice(5 - r, 10 - r);
}
