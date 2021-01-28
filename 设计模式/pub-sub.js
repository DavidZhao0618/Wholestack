// 订阅/发布模式 （观察者） 
// 在这种模式中，并不不是⼀一个对象调⽤用另⼀一个对象的⽅方法，⽽而是⼀一个对象订阅另⼀一个对象的 特定活动并在
//  状态改编后获得通知。订阅者因此也成为观察者，⽽而被观察的对象成为发布者或者主题。
//  当发⽣生了了⼀一个 重要事件时候 发布者会通知（调⽤用）所有订阅者并且可能经常已事件对象的形式传递消息。

class Event {
    constructor() {
        this.callbacks = {}
    }
    $off(name) {
        this.callbacks[name] = null
    }
    $emit(name, arg) {
        // 触发
        const cbs = this.callbacks[name];
        if (cbs) {
            cbs.forEach(c => {
                c.call(this, arg)
            });
        }
    }
    $on(name, fn) {
        // 监听
        (this.callbacks[name] || (this.callbacks[name] = [])).push(fn)
    }
}

let event = new Event();
event.$on('e1', function (arg) {
    console.log('e1', arg);
})
event.$emit('e1', { name: 'zhao' })