/**
 * 检查当前是否为工作日
 * @param date
 * @returns
 */
export declare function isWeekday(date?: Date): boolean;
/**
 * 从一个日期获取时间
 * @param date
 * @returns
 */
export declare function timeFromDate(date?: Date): string;
/**
 * 获取当前时间
 * @param t
 */
export declare function getCurrentDate(t: string | number | Date): {
    year: string;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};
/**
 * 格式化时间
 * @param formater
 * @param t
 */
export declare function dateFormater(formater?: string, t?: string | Date): string;
/**
 * 格林时间转为北京时间
 * @param {*} time
 */
export declare function switchTimeFormat(time: Date | string): string;
