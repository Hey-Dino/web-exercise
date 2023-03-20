/**
 * 单句歌词对象
 */
class Lrc {
    constructor(time, words) {
        this.time = time;
        this.words = words;
    }
}

/**
 * 将一个时间字符串转化为时间戳（单位：s）
 * @param {String} timeStr 时间字符串
 * @return {Number} timeNum 
 */
function parseTime(timeStr) {
    // 以冒号分隔时间，第一部分为分，第二部分为秒
    const parts = timeStr.split(":");

    return +parts[0] * 60 + +parts[1];
}

/**
 * 解析歌词
 * @returns {Array} results 解析后的歌词对象数组
 */
function parseLrc() {
    // 以换行符分割每句歌词
    const lines = lrc.split('\n');
    const result = [];

    lines.forEach(line => {
        const parts = line.split("]");
        const timeNum = parseTime(parts[0].substring(1));

        // 创建单句歌词对象，并插入到结果数组中
        result.push(new Lrc(timeNum, parts[1]));
    });

    return result
}
const lrcData = parseLrc()

const doms = {
    audio: document.querySelector("audio"),
    ul: document.querySelector(".container ul"),
    container: document.querySelector(".container")
}

/**
 * 计算出，当前需高亮展示的歌词索引值
 * 未有歌词需要展示时，索引值为-1
 */
function findIndex() {
    const curTime = doms.audio.currentTime;

    for (let i = 0; i < lrcData.length; i++) {
        if (curTime < lrcData[i].time) {
            return i - 1;
        }
    }

    // 上述循环未找到合适的单句歌词对象，因而说明到达曲末
    return lrcData.length - 1;
}

// 界面
/**
 * 创建歌词元素 li
 */
function createLrcElement() {
    // 创建文档片段（便于将歌词统一容器中，提高效率）
    const frag = document.createDocumentFragment();

    lrcData.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.words;
        frag.appendChild(li);
    });

    doms.ul.appendChild(frag);
}
createLrcElement();

/**
 * 高亮显示单句歌词
 * @param {Number} index 歌词索引值
 */
function highlightLrc(index) {
    // 去除先前歌词的高亮
    const oldLrc = doms.ul.querySelector("li.active");
    oldLrc && oldLrc.classList.remove("active");

    // 高亮显示当前的歌词
    const newLrc = doms.ul.children[index];
    newLrc && newLrc.classList.add("active");
}

// 容器高度
const containerHeight = doms.container.clientHeight;
// 歌词行高度
const liHeight = doms.ul.children[0].clientHeight;
// 歌词表最大偏移量
const maxOffset = doms.ul.clientHeight - containerHeight;

/**
 * 设置歌词表的偏移
 */
function setOffset() {
    // 计算当前歌词行的索引值
    const index = findIndex();

    // 计算当前歌词行距离顶部的位置
    const top = (index + 0.5) * liHeight;
    // 计算歌词表的偏移量
    let offset = top - containerHeight / 2;
    if (offset < 0) {
        offset = 0;
    }
    else if (offset > maxOffset) {
        offset = maxOffset;
    }
    // 更新歌词表的位置
    doms.ul.style.transform = `translateY(-${offset}px)`;

    // 高亮显示当前的歌词行
    highlightLrc(index);
}

// 事件
doms.audio.addEventListener("timeupdate", setOffset);