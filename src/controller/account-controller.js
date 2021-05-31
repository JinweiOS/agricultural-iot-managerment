/* eslint-disable no-unused-vars */
const { Post, Get } = require('../util/decorators');
const { web3 } = require('../loader/index');
const userContractAbiV1Json = require('../source/user-contract-abi-v1.0.json');
const contractAddress = '0xa08da05519B9577F18C1543B10d859bCbDa291ED';
const coinbaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';
const { Readable } = require('stream');

class AccountController {
    @Post('/account/unlock')
    async accountUnlock(ctx) {
        console.log('tttt');
        const { address, passwd } = ctx.request.body;
        const result = await web3.eth.personal.unlockAccount(address, passwd, 600000000);
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

        // 初始化账户金额数据
        await initCoinBalance(resultTools.address);
        // 解锁账户
        await web3.eth.personal.unlockAccount(resultTools.address, passwd, 6000000);
        console.log('main', resultTools.address);
        const date = new Date();
        const checkInTime = getTimeString();
        // TODO: 提交审核文件
        // 调用智能合约存储用户信息
        const abi = userContractAbiV1Json;
        // 用户管理智能合约实例化
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const iptUsIf = await contractIns.methods.inputUserInfo(resultTools.address, 5, '', checkInTime, '', '', '', 'null').send({ from: coinbaseAccount });
        console.log(iptUsIf);
        ctx.success({
            address: resultTools.address,
            privateKey: resultTools.privateKey,
            keyStore: keyStore,
            unlockPassword: passwd
        });
    }

    @Post('/account/registry')
    async accountRegistry(ctx) {
        const { address, passwd } = ctx.request.header;
        await web3.eth.personal.unlockAccount(address, passwd, 6000000);
        console.log(ctx.request.body);
        const { role, name, location, desc, reviewFileHref, review } = ctx.request.body;
        const date = new Date();
        const checkInTime = getTimeString();
        // TODO: 提交审核文件
        // 调用智能合约存储用户信息
        const abi = userContractAbiV1Json;
        // 用户管理智能合约实例化
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.inputUserInfo(address, parseInt(role), name, checkInTime, location, desc, reviewFileHref, review).send({ from: coinbaseAccount });
        ctx.success(result);
    }

    @Get('/account/coin/get')
    async coinGet(ctx) {
        console.log(ctx.request.header.address);
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
        console.log(ctx.request.header.address);
        const abi = userContractAbiV1Json;
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.getUserInfo(ctx.request.header.address).call();
        ctx.success(result);
    }

    @Post('/account/user/comfirm')
    async userComfirm(ctx) {
        const { address } = ctx.request.body;
        const abi = userContractAbiV1Json;
        const contractIns = new web3.eth.Contract(abi, contractAddress);
        const result = await contractIns.methods.comfirmAdd(address).send({ from: coinbaseAccount });
        ctx.success(result);
    }
}

// 初始化账户金额数目
async function initCoinBalance(address) {
    await web3.eth.personal.unlockAccount(coinbaseAccount, '1', 6000000);
    console.log(address);
    const result = await web3.eth.sendTransaction({
        from: coinbaseAccount,
        to: address,
        value: '100000000000000000000000'
    }, '1');
}

// 获取时间
function getTimeString() {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDay()}`;
}
