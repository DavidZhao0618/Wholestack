// 外观模式即让多个⽅法⼀起被调⽤
// 涉及到兼容性，参数⽀持多格式，有很多这种代码，对外暴露统⼀的api，⽐如上⾯的$on ⽀持数组，
// ￥off参数⽀持多个情况， 对⾯只⽤⼀个函数，内部判断实现
// ⾃⼰封装组件库 经常看到
myEvent = {
    stop: function (e) {
        if (typeof e.preventDefault() === "function") {
            e.preventDefault();
        }
        if (typeof e.stopPropagation() === "function") {
            e.stopPropagation();
        }
        //for IE
        if (typeof e.returnValue === "boolean") {
            e.returnValue = false;
        }
        if (typeof e.cancelBubble === "boolean") {
            e.cancelBubble = true;
        }
    },
    addEvent(dom, type, fn) {
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent('on' + type, fn);
        } else {
            dom['on' + type] = fn;
        }
    }
}