// 流
const fs = require('fs')
const rs=fs.createReadStream('./pic.jpg')
const ws=fs.createWriteStream('./pic2.jpg')
rs.pipe(ws) //导管连接--复制