/* eslint-disable no-unused-vars */
const { Post, Get } = require('../util/decorators');
const { web3 } = require('../loader/index');
const userContractAbiV1Json = require('../source/user-contract-abi-v1.0.json');
const contractAddress = '0x68B2fA777951812e1f08DA808256DDD19e5C45A0';
const { Readable } = require('stream');

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
        console.log(passwd);
        const resultTools = await web3.eth.accounts.create();
        // keystore 文件
        const keyStore = resultTools.encrypt(passwd);
        console.log(resultTools.privateKey);
        // 向节点中导入账户
        // await web3.eth.personal.importRawKey(resultTools.privateKey.substring(2), passwd);
        // ctx.success({
        //     address: resultTools.address,
        //     privateKey: resultTools.privateKey,
        //     keyStore: keyStore
        // });
        ctx.success({
            address: resultTools.address,
            privateKey: resultTools.privateKey,
            keyStore: keyStore,
            unlockPassword: passwd
        });
    }

    @Post('/account/registry')
    async accountRegistry(ctx) {
        const address = ctx.request.header.address;
        const { role, name, location, desc, reviewFileHref } = ctx.request.body;
        const date = new Date();
        const checkInTime = `${date.getTime()}`;
        // TODO: 提交审核文件
        // 调用智能合约存储用户信息
        const abi = userContractAbiV1Json;
        // 用户管理智能合约实例化
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.inputUserInfo(address, parseInt(role), name, checkInTime, location, desc, reviewFileHref).send({ from: address });
        ctx.success(result);
    }

    @Get('/account/coin/get')
    async coinGet(ctx) {
        const result = await web3.eth.getBalance(ctx.request.header.address);
        ctx.success(result);
    }

    @Get('/account/user/all')
    async userAll(ctx) {
        const abi = userContractAbiV1Json;
        // 用户管理智能合约实例化
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.getAllUserInfo().call();
        ctx.success(result);
    }

    @Get('/account/user/now')
    async userNow(ctx) {
        const abi = userContractAbiV1Json;
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.getUserInfo(ctx.request.header.address).call();
        ctx.success(result);
    }

    @Get('/account/user/comfirm')
    async userComfirm(ctx) {
        const { address, role } = ctx.request.header;
        const abi = userContractAbiV1Json;
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.comfirmAdd(address, parseInt(role)).send({ from: address });
        ctx.success(result);
    }
}

