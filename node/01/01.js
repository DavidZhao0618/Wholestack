// const os = require('os');
// const mem = os.freemem() / os.totalmem() *100;
// console.log(`内存占用率${mem.toFixed(2)}%`);
const repo = 'github:su37josephxia/vue-template';
const desc = '../test';

clone(repo,desc)
async function clone(repo,desc){
    const {promisify} = require('util')
    const download = promisify(require('download-git-repo'));
    const ora=require('ora')
    const process=ora('下载。。。项目')
    process.start()
    try {
        await download(repo,desc)
        process.succeed()
    } catch (error) {
        process.fail()
    }
}
// download(repo,desc,err=>{
//     // console.log(err?'error':'success');
//     if(err){
//         process.fail()
//     }else{
//         process.succeed()
//     }
// })