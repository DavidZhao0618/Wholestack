Function.prototype.before = function (beforefn) {
    var __self = this; // 保存原函数的引⽤
    return function () { // 返回包含了原函数和新函数的"代理"函数
        beforefn.apply(this, arguments); // 执⾏新函数，且保证 this 不被劫持，新函 数接受的参数 // 也会被原封不动地传⼊原函数，新函数在原函数之前执⾏
        return __self.apply(this, arguments); // 执⾏原函数并返回原函数的执⾏结果， // 并且保证 this 不被劫持
    }
}
Function.prototype.after = function (afterfn) {
    var __self = this;
    return function () {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var showLogin = function () {
    console.log('打开登录浮层');
}
var log = function () {
    console.log('上报标签为: ' + this.getAttribute('tag'));
}
showLogin = showLogin.after(log); // 打开登录浮层之后上报数据
document.getElementById('button').onclick = showLogin;