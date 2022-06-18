// 格式化时间的函数
function dateFormat(dateStr) {
    const date = new Date(dateStr);

    const Y = date.getFullYear();
    const M = padZero(date.getMonth() + 1);
    const D = padZero(date.getDate());

    const h = padZero(date.getHours());
    const m = padZero(date.getMinutes());
    const s = padZero(date.getSeconds());

    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

// 补零函数
function padZero(n) {
    return n < 9 ? "0" + n : n;
}

// 导出格式化函数
module.exports = {
    dateFormat
}