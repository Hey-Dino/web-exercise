window.addEventListener('load', function () {
    var focus = this.document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var arrow_l = focus.querySelector('.arrow-l');
    var arrow_r = focus.querySelector('.arrow-r');

    var imgWidth = focus.offsetWidth;
    console.log(imgWidth);
    var circle = 0;
    var num = 0;

    // 创建小圆圈
    for (let i = 0; i < ul.children.length; i++) {
        // 创建li节点
        var li = this.document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);

        // 为小圆圈添加点击事件
        li.addEventListener('click', function () {
            // 调用exclusibe排他函数，为小圆圈添加点击效果
            exclusive(ol, this);

            // 调用animate动画函数，添加图片移动效果
            circle = parseInt(this.getAttribute('index'));
            num = circle;
            animate(ul, -(circle * imgWidth));
        });
    }
    // 初始化图一的className为current
    ol.children[0].className = 'current';

    // 克隆图一，插入在ul末尾，用于无缝切换
    var li = ul.firstElementChild.cloneNode(true);
    ul.appendChild(li);
    // 动态设置ul的宽度
    ul.style.width = (ul.children.length * 100) + '%';


    // 左右箭头显示于隐藏
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 移入focus，停止轮播，即停止定时器
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 移入focus，停止轮播，即停止定时器
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    });

    var flag = true;  // 节流阀
    // 为箭头添加点击事件
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀

            // 控制小圆圈点击效果
            circle = (circle == 0) ? (ol.children.length - 1) : circle - 1;
            exclusive(ol, ol.children[circle]);

            // 控制图片移动
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -(num * imgWidth) + 'px';
            }
            num--;
            animate(ul, -(num * imgWidth), function () {
                flag = true;  // 开启节流阀
            });
        }
    });
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;  // 关闭节流阀

            circle = (circle == ol.children.length - 1) ? 0 : circle + 1;
            // 控制小圆圈点击效果
            exclusive(ol, ol.children[circle]);

            // 控制图片移动
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -(num * imgWidth), function(){
                flag = true;  // 开启节流阀
            });
        }
    });


    // 设置自动轮播效果
    var timer = this.setInterval(function () {
        arrow_r.click();
    }, 2000);

    // 排他效果
    function exclusive(obj, target) {
        for (var i = 0; i < obj.children.length; i++) {
            obj.children[i].className = '';
        }
        target.className = 'current';
    }
})