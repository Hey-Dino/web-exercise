$(function () {
    // 1. 全选 全不选功能模块
    $('.checkall').change(function () {
        var isCheck = $(this).prop('checked');
        $('.j-checkbox, .checkall').prop('checked', isCheck);

        // 控制checked后cart-item的背景颜色
        if (isCheck == true) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }

        // 调用函数，计算总计和总额
        getSum();
    });

    // 2. 小复选框与全选框的对应关系，所有小复选框均为checked，则全选框也为checked，反之亦然
    function updateCheckAll() {
        // 控制checked
        var checkNum = $('.j-checkbox:checked').length;
        var goodsNum = $('.cart-item').length;

        if (goodsNum == 0 || checkNum != goodsNum) {
            $('.checkall').prop('checked', false);
        } else {
            $('.checkall').prop('checked', true);
        }
    }

    $('.j-checkbox').change(function () {
        // 调用updateCheckAll函数，更新全选按钮状态
        updateCheckAll();

        // 控制checked后cart-item的背景颜色
        if ($(this).prop('checked') == true) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }

        // 调用函数，计算总计和总额
        getSum();
    });

    // 3. 增减商品数量模块
    // 计算商品小计的函数
    function getGoodsSum(obj, num) {
        // 计算商品单价
        var price = $(obj).parents('.p-num').siblings('.p-price').text();
        // 去除商品单价前的RMB符号￥
        price = price.substr(1);
        // 修改小计
        $(obj).parents('.p-num').siblings('.p-sum').text('￥' + (price * num).toFixed(2));
    };
    $('.decrement').click(function () {
        // 查询商品的原数量
        var num = parseInt($(this).siblings('.itxt').val());
        // 判断后修改商品数量
        if (num > 1) {
            $(this).siblings('.itxt').val(--num);
        }
        // 调用函数，计算小计
        getGoodsSum(this, num);

        // 调用函数，计算总计和总额
        getSum();
    });
    $('.increment').click(function () {
        // 查询商品的原数量
        var num = $(this).siblings('.itxt').val();
        // 修改商品数量
        $(this).siblings('.itxt').val(++num);
        // 调用函数，计算小计
        getGoodsSum(this, num);

        // 调用函数，计算总计和总额
        getSum();
    });

    // 4.用户输入商品数量，调整小计模块
    $('.itxt').change(function () {
        // 查询更改后的商品数量
        var num = $(this).val();
        // 调用函数，计算小计
        getGoodsSum(this, num)
    });

    // 5.计算总计和总额模块
    getSum();

    function getSum() {
        var amountSum = 0;  // 商品总数
        var priceSum = 0;  // 商品总额

        // 存在bug，不论商品是否选中都累加
        // $('.itxt').each(function (i, ele) {
        //     amountSum += parseInt($(ele).val());
        //     console.log($(ele).val());
        // });
        // $('.p-sum').each(function (i, ele) {
        //     console.log($(ele).text());
        //     priceSum += parseFloat($(ele).text().substr(1));
        // });


        $('.cart-item').each(function () {
            // 获取该商品checkbox的选中状态
            var isCheck = $(this).find('.j-checkbox').prop('checked');

            // 如果为选中状态，则累加商品数量和商品金额
            if (isCheck) {
                amountSum += parseInt($(this).find('.itxt').val());
                priceSum += parseFloat($(this).find('.p-sum').text().substr(1));
            }
        });

        $('.amount-sum em').text(amountSum);
        $('.price-sum em').text('￥' + priceSum.toFixed(2));
    }

    // 6.删除商品
    // 删除单个商品
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();

        // 调用函数，计算总计和总额
        getSum();

        // 调用函数，更新全选按钮状态
        updateCheckAll();
    });
    // 删除部分商品
    $('.remove-batch').click(function () {
        // 遍历cart-item，删除选中的元素
        $('.j-checkbox:checked').each(function () {
            $(this).parents('.cart-item').remove();
        });

        // 调用函数，计算总计和总额
        getSum();

        // 调用函数，更新全选按钮状态
        updateCheckAll();
    });

    // 删除全部商品
    $('.clear-all').click(function () {
        $('.cart-item').remove();

        // 调用函数，计算总计和总额
        getSum();

        // 调用函数，更新全选按钮状态
        updateCheckAll();
    });
});