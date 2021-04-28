// babel presets 配置
const presets = [
    ['@babel/env', {
        targets: {
            // 编译目标当前 node 的版本
            node: process.versions.node
        }
    }]
]
// babel 插件配置
const plugins = [
    ['@babel/plugin-proposal-decorators', {
        legacy: true
    }],
    ['@babel/plugin-proposal-class-properties', {
        loose: true
    }]
]

const others = {
    sourceMaps: 'both'
}

module.exports = { plugins, presets, ...others }