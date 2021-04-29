/* eslint-disable no-unused-vars */
const { Post } = require('../util/decorators');
const { web3 } = require('../loader/index');

class AccountController {
    @Post('/account/unlock')
    async accountUnlock(ctx) {
        console.log('tttt');
        const { address, passwd } = ctx.request.body;
        const result = await web3.eth.personal.unlockAccount(address, passwd, 6000000);
        ctx.success(result);
    }
    @Post('/account/create')
    async accountCreate(ctx) {
        const { passwd } = ctx.request.body;
        const resultTools = await web3.eth.accounts.create();
        // keystore 文件
        const keyStore = resultTools.encrypt(passwd);
        console.log(resultTools.privateKey);
        // 向节点中导入账户
        await web3.eth.personal.importRawKey(resultTools.privateKey.substring(2), passwd);
        ctx.success({
            address: resultTools.address,
            privateKey: resultTools.privateKey,
            keyStore: keyStore
        });
    }

    @Post('/account/registry')
    async accountRegistry(ctx) {
        const params = ctx.request.body;
        const date = new Date();
        params.date = `${date.getTime()}`;
        // TODO: 提交审核文件
        ctx.success();
        // 调用智能合约存储用户信息

        
    }
}