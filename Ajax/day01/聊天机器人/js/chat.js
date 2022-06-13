$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        // 获取输入框内容
        var text = $("#ipt").val().trim();
        if (text.length <= 0)
            return $("#ipt").val("");

        // 追加用户输入的聊天内容
        $("#talk_list").append("<li class='right_word'><img src='img/person02.png'/><span>" + text + "</span></li>");

        // 将页面滚动至底部
        resetui();

        // 清除输入框内容
        $("#ipt").val("");

        // 调用功能，获取机器人回复的消息
        var reply = getMsg(text);
    })

    // 获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.get("http://www.liulongbin.top:3006/api/robot", {
            spoken: text
        }, function (res) {
            var msg = res.data.info.text;

            // 追加机器人回复消息
            $("#talk_list").append("<li class='left_word'><img src='img/person01.png'/><span>" + msg + "</span></li>");

            // 将页面滚动至底部
            resetui();

            // 调用功能，将机器人回复的消息转化为语音
            getVoice(msg);
        });
    }

    // 把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: "GET",
            url: "http://www.liulongbin.top:3006/api/synthesize",
            data: {
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    $("#voice").prop("src", res.voiceUrl);
                }
            }
        });
    }

    // 为文本框绑定 keyup 事件
    $("#ipt").on("keyup", function (e) {
        if (e.keyCode === 13) {
            $("#btnSend").click();
        }
    })
})