/** 基础设施 */

// 返回一个随机ID
export function getRandomID (randomGap = 1000) {
  return +new Date() + ((Math.random() * randomGap).toFixed(0) + '')
}

// 返回一个随机数字
export function getRandomNumber (min = 0, max = 100) {
  return Math.floor(min + (Math.random() * max))
}

// 返回数组随机一项
export function getRandomItem (arr = []) {
  return arr[getRandomNumber(0, arr.length)]
}

// 计算概率 (不要在同一个事件循环里调用这个函数, 否则结果相同)
export function percent (percentNum = 50) {
  const basis = 100
  return (Math.random() * basis) < basis * (percentNum / 100)
}

export function deepClone (obj) {
  let res = null
  try {
    res = JSON.parse(JSON.stringify(obj))
  } catch (e) {
    res = {}
  }
  return res
}


/** 时间格式化 */

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const getTimeOffset = (time, offset) => {
  return new Date((new Date(time).getTime() + offset))
}
export function getRandomTimeStamp (basis) {
  return ((+new Date(+new Date() - getRandomNumber(0, basis)))).toFixed(0)
}
export function getRandomFormatedTime () {
  return formatTime(new Date(+getRandomTimeStamp()))
}
export function getNextWeek(YMD) {
  const nextWeek = getYMD(getTimeOffset(YMD, 7 * 24 * 60 * 60 * 1000))
  return `${YMD} - ${nextWeek}`
}
export function getLastWeek(YMD = getYMD(new Date())) {
  const lastWeek = getYMD(getTimeOffset(YMD, -(7 * 24 * 60 * 60 * 1000)))
  // console.log(`${lastWeek} - ${YMD}`)
  return `${lastWeek} - ${YMD}`
}
// 格式化时间到年月日分秒
export function formatTime(date, sep = '/') {
    if (!date.getTime) {
      date = new Date(date)
    }
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join(sep) + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 格式化时间到年月日
export function getYMD(date, split = '/') {
    if (!date || !date.getTime) {
      date = new Date(date)
    }
    var year = date.getFullYear();
    var month = parseInt(date.getMonth()) + 1;
    var day = date.getDate();
    month = formatNumber(month);
    day = formatNumber(day);
    return [year, month, day].join(split)
}

export function getTomorrowYMD(date) {
    var year = date.getFullYear();
    var month = parseInt(date.getMonth());
    var day = date.getDate() + 1;
    var tday = new Date(year, month, day);
    return getYMD(tday);
}

// 推算时间是X天前X小时前X分前等
export function ago(date) {
  if (typeof(date) !== "number") return "";
  let now = Number(new Date());
  let msec = now - date;
  let minutes = 60 * 1000;
  let hours = 60 * minutes;
  let days = 24 * hours;
  let minutiesAgo = parseInt(msec / minutes);
  let hoursAgo = parseInt(msec / hours);
  let daysAgo = parseInt(msec / days);
  return (
    daysAgo ? `${daysAgo}天前`
      : hoursAgo ? `${hoursAgo}小时前`
      : minutiesAgo ? `${minutiesAgo}分钟前`
      : "刚刚"
  )
}

export default {
  getRandomItem,
  deepClone,
}
