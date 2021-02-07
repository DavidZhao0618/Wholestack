class Stack {
    constructor() {
        this.items = []
    }
    push(item) {
        this.items.push(item)
    }
    pop() {
        return this.items.pop()
    }
    size() {
        return this.items.length
    }
    clear() {
        this.items = []
    }
}
// 经典案例： 括号匹配，html标签匹配，表达式计算
function isBalance(symbol) {
    const stack = new Stack()
    const left = '{('
    const right = '})'
    let popValue
    let tag = true

    const match = function (popValue, current) {
        if (left.indexOf(popValue) !== right.indexOf(current)) {
            tag = false
        }
    }

    for (let i = 0; i < symbol.length; i++) {
        if (left.includes(symbol[i])) {
            console.log(1,symbol[i]);
            stack.push(symbol[i])
        } else if (right.includes(symbol[i])) {
            console.log(2,symbol[i]);
            popValue = stack.pop()
            match(popValue, symbol[i])
        }
    }
    return tag
}
console.log(isBalance('{{(({}))}}'))
console.log(isBalance('{{(({})}}'))