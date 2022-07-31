
/**
 * 检查当前是否为工作日
 * @param date 
 * @returns 
 */
export function isWeekday(date: Date = new Date()) {
    return date.getDay() % 6 !== 0;
}

/**
 * 从一个日期获取时间
 * @param date 
 * @returns 
 */
export function timeFromDate(date: Date = new Date()) {
    return date.toTimeString().slice(0, 8);
}
/**
 * 获取当前时间
 * @param t 
 */
export function getCurrentDate(t: string | number | Date) {
    let date = t ? new Date(t) : new Date();
    return {
        year: date.getFullYear() + '',
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }
}


/**
 * 格式化时间
 * @param formater 
 * @param t 
 */
export function dateFormater(formater: string = 'YYYY-MM-DD hh:mm:ss', t: string | Date = new Date()) {
    const { year, month, day, hour, minute, second } = getCurrentDate(t);
    return formater.replace(/YYYY/g, year)
        .replace(/YY/g, year.substr(2, 2))
        .replace(/MM/g, (month < 10 ? '0' : '') + month)
        .replace(/DD/g, (day < 10 ? '0' : '') + day)
        .replace(/hh/g, (hour < 10 ? '0' : '') + hour)
        .replace(/mm/g, (minute < 10 ? '0' : '') + minute)
        .replace(/ss/g, (second < 10 ? '0' : '') + second);
}

const addZero = (v: string | number) => v < 10 ? '0' + v : v;
/**
 * 格林时间转为北京时间
 * @param {*} time 
 */
export function switchTimeFormat(time: Date | string) {
    const dateTime = new Date(time);
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();
    return `${year}-${addZero(month)}-${addZero(date)} ${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
}


const intiailObj = {
    day: 0,
    hours: 0,
    minute: 0,
    second: 0,
}

/**
 * 计算距离当前时间的时间差
 */
export function getTimeDistance(diff = 0, obj = intiailObj) {
    if (diff < 60) {
        obj.second = diff;
    } else if (diff < 3600) {
        const num = 60;
        const month = Math.floor(diff / num);
        const remain = diff - num * month;
        obj.minute = month
        if (remain > 0) getTimeDistance(remain, obj);
    } else if (diff < 3600 * 24) {
        const num = 3600;
        const hours = Math.floor(diff / num);
        const remain = diff - num * hours;
        obj.hours = hours
        if (remain > 0) getTimeDistance(remain, obj);
    } else {
        const num = 3600 * 24;
        const day = Math.floor(diff / num);
        const remain = diff - num * day;
        obj.day = day;
        if (remain > 0) getTimeDistance(remain, obj);
    }
    return obj;
}