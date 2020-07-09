// 策略略模式的定义：定义⼀一系列列的算法，把他们⼀一个个封装起来，并且使他们可以相互替换。
// 策略略模式的⽬目的就是将算法的使⽤用算法的实现分离开来。

// 可以抽离配置文件
// const config={
//     'S':4,
//     'a':3,
//     'b':2,
// }
const policy={
    'S':function(salary){
        return salary*4
    },
    'A':function(salary){
        return salary*3
    },
    'B':function(salary){
        return salary*2
    },
}
function calculate(lv,salary){
    // 使用策略
    return policy[lv] ? policy[lv](salary):salary
}

// 表单 element-ui rules=[]

var a=[];
for(let i=0;i<10;i++){
    a[i]=function(){
        console.log(i);
    }
}
console.log(a[6]());

