// 提供创建对象的接⼝，把成员对象的创建⼯作转交给⼀个外部对象，好处在于消除对象之间的耦合(也就是相互影响)
// 常⻅的例⼦，我们的弹窗，message，对外提供的api，都是调⽤api，然后新建⼀个弹窗或者Message的实例，就是典型的⼯⼚模式
// https://github.com/ElemeFE/element/blob/dev/packages/notification/src/main.js#L11
const Notification = function (options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    const userOnClose = options.onClose;
    const id = 'notification_' + seed++;
    const position = options.position || 'top-right';
    options.onClose = function () {
        Notification.close(id, userOnClose);
    };
    instance = new NotificationConstructor({
        data: options
    });
    if (isVNode(options.message)) {
        instance.$slots.default = [options.message];
        options.message = 'REPLACED_BY_VNODE';
    }
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instance.dom = instance.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();
    let verticalOffset = options.offset || 0;
    instances.filter(item => item.position === position).forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });
    verticalOffset += 16;
    instance.verticalOffset = verticalOffset;
    instances.push(instance);
    return instance;
};