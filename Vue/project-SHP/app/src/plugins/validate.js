/* 
    vee-validate插件，用于表单验证
*/
import Vue from "vue";
import VeeValidate from "vee-validate"
// 中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";

// 注册插件
Vue.use(VeeValidate);

// 表单验证
VeeValidate.Validator.localize("zh_CN", {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同`,
    },
    attributes: {
        phone: "手机号",
        code: "验证码",
        password1: "密码",
        password2: "确认密码",
        aggree: "协议",
    },
});

// 自定义监测规则
VeeValidate.Validator.extend("aggree", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => `请点击同意${field}`,
})