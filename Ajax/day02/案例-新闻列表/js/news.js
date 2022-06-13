$(function () {
    getNewsList();

    // 给时间补零的函数
    function padZero(n) {
        if (n < 10) {
            return '0' + n
        } else {
            return n
        }
    }

    // 过滤器-转换时间格式
    template.defaults.imports.dateFormat = function (time) {
        var time = new Date(time);

        var year = time.getFullYear();
        var month = padZero(time.getMonth() + 1);
        var day = padZero(time.getDate());
        var hour = padZero(time.getHours());
        var minutes = padZero(time.getMinutes());
        var second = padZero(time.getSeconds());

        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + second;
    };

    // 2.加载数据
    function getNewsList() {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/news",
            success: function (res) {
                if (res.status !== 200)
                    return alert("获取新闻列表失败！");

                for (var i = 0; i < res.data.length; i++) {
                    // 把每一项的 tags 属性，从字符串改造成字符串的数组
                    res.data[i].tags = res.data[i].tags.split(',')
                }

                // 4.调用template函数
                var htmlStr = template("news", res);

                // 5.渲染HTML结构
                $("#news-list").html(htmlStr);
            }
        });
    };
})