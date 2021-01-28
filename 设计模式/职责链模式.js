// 假设我们负责⼀个售卖⼿机的电商⽹站，经过分别交纳 500 元定⾦和 200 元定⾦的两轮预定后(订单已
//     在此时⽣成)，现在已经到了正式购买的阶段。 公司针对⽀付过定⾦的⽤户有⼀定的优惠政策。在正式
//     购买后，已经⽀付过 500 元定⾦的⽤ 户会收到 100 元的商城优惠券，200 元定⾦的⽤户可以收到 50 元
//     的优惠券，⽽之前没有⽀付定⾦的⽤户只能进⼊普通购买模式，也就是没有优惠券，且在库存有限的情
//     况下不⼀定保证能买到。
var order = function (orderType, pay, stock) {
    if (orderType === 1) { // 500 元定⾦购买模式
        if (pay === true) { // 已⽀付定⾦
            console.log('500 元定⾦预购, 得到 100 优惠券');
        } else { // 未⽀付定⾦，降级到普通购买模式
            if (stock > 0) { // ⽤于普通购买的⼿机还有库存
                console.log('普通购买, ⽆优惠券');
            } else {
                console.log('⼿机库存不⾜');
            }
        }
    } else if (orderType === 2) {
        if (pay === true) { // 200 元定⾦购买模式
            console.log('200 元定⾦预购, 得到 50 优惠券');
        } else {
            if (stock > 0) {
                console.log('普通购买, ⽆优惠券');
            } else {
                console.log('⼿机库存不⾜');
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通购买, ⽆优惠券');
        } else {
            console.log('⼿机库存不⾜');
        }
    }
};
order(1, true, 500); // 输出: 500 元定⾦预购, 得到 100 优惠券

// 现在我们采⽤职责链模式重构这段代码，先把 500 元订单、200 元订单以及普通购买分成 3 个函数。
// 接下来把 orderType、pay、stock 这 3 个字段当作参数传递给 500 元订单函数，如果该函数不符合处
// 理条件，则把这个请求传递给后⾯的 200 元订单函数，如果 200 元订单函数依然不能处理该请求，则
// 继续传递请求给普通购买函数。
var order500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定⾦预购，得到 100 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下⼀个节点是谁，反正把请求往后⾯传递
    }
};
var order200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200 元定⾦预购，得到 50 优惠券');
    } else {
        return 'nextSuccessor'; // 我不知道下⼀个节点是谁，反正把请求往后⾯传递
    }
};
var orderNormal = function (orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通购买，⽆优惠券');
    } else {
        console.log('⼿机库存不⾜');
    }
};
// Chain.prototype.setNextSuccessor 指定在链中的下⼀个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function (fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function (successor) {
    return this.successor = successor;
};
Chain.prototype.passRequest = function () {
    var ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(
            this.successor, arguments);
    }
    return ret;
};
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
chainOrder500.passRequest(1, true, 500); // 输出:500 元定⾦预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出:200 元定⾦预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出:普通购买，⽆优惠券
chainOrder500.passRequest(1, false, 0); // 输出:⼿机库存不⾜