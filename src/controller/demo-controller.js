/* eslint-disable no-unused-vars */
/**
 * @file 应用程序启动主函数。对路由中间件、数据库中间件、自定义扩展进行加载
 */
const { Post, Get } = require('../util/decorators');
const { web3 } = require('../loader/index');
class C {
    constructor() {
        this.name = 'c';
    }

    @Get('/')
    async method(ctx) {
        this.name;
        const { appId } = ctx.query;
        ctx.success(ctx.request.header);
    }

    @Get('/test/coin')
    async hello(ctx) {
        await web3.eth.personal.unlockAccount('0xebf844ec4e67d5007051dacca8530b53179244e0', '1', 6000000);
        const result = await web3.eth.sendTransaction({
            from: '0xebf844ec4e67d5007051dacca8530b53179244e0',
            to: '0x07F6709b26696C69AC84b4dc3f188625DEc3fA1A',
            value: '100000000000000000000000'
        }, '1');
        ctx.success({ result });
    }
}


