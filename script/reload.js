const fs = require('fs')
const path = require('path')
const child_process = require('child_process')
const { stderr } = require('process')
const { clearTimeout } = require('timers')
if (process.argv.length <= 2 || process.argv.length > 3) {
    throw new Error('仅允许传递一个热更新目录!')
}

let program = null
// 设置定时器函数
function setClock(time) {
    const timer = setTimeout(() => {
        // babel 编译
        const compile = child_process.spawn(`npm run dev`, { stdio: 'inherit', shell: true })

        // 编译完成之后开始启动 server
        compile.on('exit', () => {
            if (program) {
                program.kill()
            }
            program = child_process.spawn(`node`, [`./dist/app.js`], { stdio: 'inherit' })
        })
    }, time || 2000)
    return timer
}
// 防抖时钟
let clock = null

const watchDir = path.resolve(process.argv[2])

// 初始启动监听
setClock(0)

// 开始监听
fs.watch(watchDir, { recursive: true }, (event, filename) => {
    if (clock) {
        clearTimeout(clock)
    }
    clock = setClock()
})