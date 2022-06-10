//格式化数字
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
//格式化输入的时间
const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].map(formatNumber).join('-')
};
/**
 * 获得年
 */
const getYear = () => new Date().getFullYear();
/**
 * 获得月
 */
const getMonth = () => {
    var m = new Date().getMonth() + 1;
    return m > 10 ? m : "0" + m;
}
/**
 * 获得当前日期
 */
const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join('-')
}
/**
 * 降序函数
 * @param a
 * @param b
 * @returns {number}
 */
function desc(a, b) {
  return b - a;
}

module.exports = {
  formatDate: formatDate,
  getDate: getDate,
  getYear: getYear,
  getMonth: getMonth,
  desc:desc,
};