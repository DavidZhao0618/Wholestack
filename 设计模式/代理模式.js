var imgFunc = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
var proxyImage = (function () {
    var img = new Image();
    img.onload = function () {
        imgFunc.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            imgFunc.setSrc('./loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('./pic.png');

// 假设我们在做⼀个⽂件同步的功能，当我们选中⼀个 checkbox 的时候，它对应的⽂件就会被同 步到另
// 外⼀台备⽤服务器上⾯。当⼀次选中过多时，会产⽣频繁的⽹络请求。将带来很⼤的开销。可以通过⼀
// 个代理函数 proxySynchronousFile 来收集⼀段时间之内的请求， 最后⼀次性发送给服务器
var synchronousFile = function (id) {
    console.log('开始同步⽂件，id 为: ' + id);
};
var proxySynchronousFile = (function () {
    var cache = [], // 保存⼀段时间内需要同步的 ID
        timer; // 定时器
    return function (id) {
        cache.push(id);
        if (timer) { // 保证不会覆盖已经启动的定时器
            return;
        }
        timer = setTimeout(function () {
            synchronousFile(cache.join(','));
            clearTimeout(timer); // 清空定时器
            timer = null;
            cache.length = 0; // 清空 ID 集合
        }, 2000);
    }// 2 秒后向本体发送需要同步的 ID 集合
})();
var checkbox = document.getElementsByTagName('input');
for (var i = 0, c; c = checkbox[i++];) {
    c.onclick = function () {
        if (this.checked === true) {
            proxySynchronousFile(this.id);
        }
    }
}
