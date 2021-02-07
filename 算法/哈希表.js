class HashTable {
    constructor() {
        this.items = {}
    }
    put(key, value) {
        const hash = this.keyToHash(key)
        this.items[hash] = value
    }
    get(key) {
        return this.items[this.keyToHash(key)]
    }
    remove(key) {
        delete (this.items[this.keyToHash(key)])
    }
    keyToHash(key) {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        hash = hash % 37 // 为了避免 hash 的值过⼤
        return hash
    }
}
let table = new HashTable()
table.put('name', 'mytable')
table.put('age', '6')
table.put('best', 'jack')
console.log(table.get('name'))
console.log(table.get('best'))
table.remove('name')
console.log(table.get('name'))