const api = require('./api.js')
const proxy = require('./proxy.js')

api.listen(4000)
proxy.listen(3000)