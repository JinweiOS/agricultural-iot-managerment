/** @file 收集所有的controller, 初始化koa-router */

const fs = require('fs');
const path = require('path');
// TODO: controller 后续要从配置中进行读取，此处暂时写死
const basePath = path.join(__dirname, '../controller');
// 从装饰器中导出 controller 元信息
const { controllerMap } = require('./decorators');
const koaRouter = require('@koa/router');

const files = fs.readdirSync(basePath)
    // 过滤非 js 文件
    .filter(item => {
        return path.extname(item) === '.js';
    })
    // 拼接文件的完整路径
    .map(item => {
        return path.join(basePath, item);
    });

// 对controller进行 require, 以执行装饰器函数
files.forEach(item => {
    // 此处 require 仅仅是为了执行一次代码
    require(item);
});

// 实例化Controller Class, 绑定至methond, 构造koa-router对象
const routerIns = new koaRouter();
controllerMap.forEach((value, key) => {
    const cIns = new key.constructor();
    value.forEach(props => {
        // 将路由信息绑定至 koa-router
        routerIns[props.method](props.url, props.fn.bind(cIns));
    });
});

module.exports = {
    router: routerIns
};
