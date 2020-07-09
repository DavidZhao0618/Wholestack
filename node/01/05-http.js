const http = require('http')
const fs = require('fs')
const server = http.createServer((req, res) => {
    // console.log(11);
    // res.end('hello node')
    const {
        url,
        method,
        headers
    } = req;
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                res.end('500')
            }
            res.statusCode = 200;
            res.setHeader('Content-type', 'text/html')
            res.end(data)
        })
    } else if (url === '/user' && method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({
            name: 'zhaozz'
        }))
    }else if(method==='GET'&&headers.accept.indexOf('image/*')!==-1){
        console.log(url);
        
        fs.createReadStream('.'+url).pipe(res)
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8');
        res.end('404, ⻚页⾯面没有找到');
    }

})
server.listen(3000)