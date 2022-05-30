$(function () {
    var toolTop = $('.recommend').offset().top;
    // 节流阀
    var flag = true;
    // 控制页面导航的滑入和滑出
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').stop().fadeIn();
        } else {
            $('.fixedtool').stop().fadeOut();
        }
    };
    // 避免页面刷新时不显示页面导航
    toggleTool();

    $(window).scroll(function () {
        toggleTool();

        // 页面导航随滚动变化
        if (flag) {
            $('.floor>div').each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $('.fixedtool ul li').eq(i).addClass('current').siblings('li').removeClass('current');
                }
            });
        }
    });

    $('.fixedtool ul li').click(function () {
        flag = false;

        var index = $(this).index();
        $(this).addClass('current').siblings('li').removeClass('current');

        $('body, html').stop().animate({
            scrollTop: $('.floor>div').eq(index).offset().top
        }, function () {
            flag = true
        });

        // flag在此处更改是无效的，应该js是先赋指后执行animate函数
        // flag = true;
    });
})