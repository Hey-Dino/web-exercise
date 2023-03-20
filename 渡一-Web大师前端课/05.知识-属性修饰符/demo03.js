/**
 * 优化 购物车效果 中的代码
 */

const goods = {
    pic: '.',
    title: '..',
    desc: `...`,
    sellNumber: 1,
    favorRate: 2,
    price: 3,
}

/* // 1、原先写法，易导致对象属性值被任意修改
class UIGoods {
    constructor(g) {
        this.data = g;
    }
}
const uiGoods = new UIGoods(goods);
uiGoods.data = "abc";
console.log(uiGoods.data); */

// 2、优化写法
class UIGoods {
    // 商品总价
    get totalPrice() {
        return this.data.price * this.chooseNum;
    }

    // 商品是否选择
    get isChoose() {
        return this.chooseNum > 0;
    }

    constructor(g) {
        // 为避免开发者跨过set()，直接修改this.data对象的属性，需做对象冻结操作
        // 为避免直接冻结原数据，需深拷贝原数据
        g = { ...g } && Object.freeze(g);

        // 商品基础信息
        Object.defineProperty(this, "data", {
            // get、set 统称 访问器
            get: function () {
                return g;
            },
            set: function () {
                throw new Error("Cannot redefine property: data");
            },
            // 不能同时指定访问器和writable属性
            // writable: false,
            configurable: false,
        });

        // 商品选择数量
        let innerChooseNum = 0;
        Object.defineProperty(this, "chooseNum", {
            configurable: false,
            get: function () {
                return innerChooseNum;
            },
            set: function (val) {
                // 判断是否为数字
                if (typeof val !== "number") {
                    throw new Error("The typeof of attribute value must be number: chooseNum");
                }

                // 判断是否为整数
                if (parseInt(val) !== val) {
                    throw new Error("The value of the attribute must be integer: chooseNum");
                }

                // 判断是否为0或正数
                if (val < 0) {
                    throw new Error("The value of the attribute must be positive number or zero: chooseNum");
                }

                innerChooseNum = val;
            }
        });

        // 为避免用户在实例对象添加属性，需做对象密封操作
        // 冻结与密封的区别：冻结对象的属性一致无法修改，密封对象的属性是否能够修改依据其writable
        Object.seal(this)
    }
}

// 为避免用户在显式原型添加属性，需对原型 prototype 做冻结操作
Object.freeze(UIGoods.prototype);

const uiGoods = new UIGoods(goods);

uiGoods.chooseNum = 3;
console.log("total price:", uiGoods.totalPrice, " is choose:", uiGoods.isChoose)

uiGoods.data.price = 4;     // uiGoods.data对象被冻结，对象属性无法修改
uiGoods.temp = "testValue"; // UIGoods实例对象被密封后，添加新属性无效
UIGoods.prototype.temp = "testValue";   // UIGoods 显式原型被冻结后，添加新属性无效