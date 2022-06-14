/**
 * 处理data的函数
 * @param {data} 需要发送到服务器的数据
 * @return {string} 返回拼接好的查询字符串
 */
function resolveData(data) {
    var arr = [];
    for (var k in data) {
        arr.push(k + "=" + data[k]);
    }

    return arr.join("&");
}

function itheima(options) {
    var xhr = new XMLHttpRequest();

    var qs = resolveData(options.data);

    if (options.method.toUpperCase() == "GET") {
        xhr.open("GET", options.url + "?" + qs);
        xhr.send();
    } else if (options.method.toUpperCase() == "POST") {
        xhr.open("POST", options.url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(qs);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }
}