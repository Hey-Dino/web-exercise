$(function () {
    // 调用函数，加载、渲染数据
    load();

    $("#title").on("keyup", function (e) {
        if (e && e.keyCode == 13) {
            var content = $(this).val();

            if (content != "") {
                // 1.读取本地存储的原数据
                var local = getData();
                // 2.在原数据的基础上添加
                local.push({
                    title: $("#title").val(),
                    done: false
                });
                // 3.调用函数存储数据
                storeData(local);

                // 调用函数，加载、渲染数据
                load();

                // 清除文本框内容
                $(this).val("");
            }
        }
    });

    // 获取数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // 本地存储的数据是字符串格式，需要转化为对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 存储数据
    function storeData(local) {
        localStorage.setItem("todolist", JSON.stringify(local));
    }

    // 渲染、加载数据
    function load() {
        // todocount为“正在进行”的事件数量，donecount为“已经完成”的事件数量
        var todocount = 0, donecount = 0;

        // 读取本地存储数据
        var data = getData();
        // 清除.todolist和.donelist的li
        $("#todolist, #donelist").empty();
        // 创建、插入节点
        $.each(data, function (i, ele) {
            // 1.创建节点
            var li = $("<li></li>");
            // 2.为节点添加数据
            li.html($("<input type='checkbox'/>" + "<p>" + ele.title + "</p>" + "<a href='javascript:;' index='" + i + "'></a>"));
            // 3.判断ele.done的值，选中插入的对象
            if (!ele.done) {
                todocount++;
                $("#todolist").prepend(li);
            } else {
                donecount++;
                li.children("input").prop("checked", true);
                $("#donelist").prepend(li);
            }
        });

        // 更新正在进行、已经完成的事件
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    }

    // 删除操作
    $("#todolist, #donelist").on("click", "a", function () {
        // 先获取本地存储
        var data = getData();
        // 删除数据
        data.splice($(this).attr("index"), 1);
        // 保存到本地存储
        storeData(data);
        // 重新渲染页面
        load();
    });

    // 正在进行和已完成选项操作
    $("#todolist, #donelist").on("click", "input", function () {
        // 先获取本地存储
        var data = getData();
        // 修改done数据
        var index = $(this).siblings("a").attr("index");
        var isChecked = $(this).prop("checked");
        data[index].done = isChecked;
        // 保存到本地存储
        storeData(data);
        // 重新渲染页面
        load();
    });
});