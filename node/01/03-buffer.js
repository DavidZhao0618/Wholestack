const buf1 =Buffer.alloc(10) // 分配内存空间
console.log(buf1);

const buf2 =Buffer.from('a') // a放到内存空间
console.log(buf2);

const buf3 =Buffer.from('中') // a放到内存空间
console.log(buf3);

const buf4 =Buffer.concat([buf2,buf3]) // 合并
console.log(buf4.toString());
