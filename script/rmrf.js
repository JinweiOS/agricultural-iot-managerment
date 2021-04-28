const fs = require('fs')
const path = require('path')
if (process.argv.length <= 2) {
    throw new Error('你未传递需要删除的目录！')
}
// 可以传递多个目录
const waitDelDir = process.argv.slice(2, process.argv.length)
waitDelDir.forEach((dir) => {
    console.log(`正在删除此目录: ${path.resolve(dir)}`)
    if (!fs.existsSync(path.resolve(dir))) {
        console.log('不存在此目录!')
    }
    fs.rmdirSync(path.resolve(dir), {
        recursive: true,
        force: true
    })
})