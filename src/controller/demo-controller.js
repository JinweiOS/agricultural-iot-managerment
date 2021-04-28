/* eslint-disable no-unused-vars */
/**
 * @file 应用程序启动主函数。对路由中间件、数据库中间件、自定义扩展进行加载
 */
const { Post, Get } = require('../util/decorators');
class C {
    constructor() {
        this.name = 'c';
    }

    @Post('/test/dev')
    async method(ctx) {
        this.name;
        const { appId } = ctx.query;
        console.log(this.name);
    }

    @Get('/test/dev')
    async hello(ctx) {
        ctx.body = this.name;
    }
}


