const fs =require('fs');

//同步调用
const data = fs.readFileSync('./01.js')
console.log(data.toString());

// 异步读取
fs.readFile('./01.js',(err,data)=>{
    if(err) throw err
    console.log(data.toString());
})