/* eslint-disable no-unused-vars */
const { Post } = require('../util/decorators');
const buyAbi = require('../source/buy-contract-abi.json');
const { web3 } = require('../loader/index');
const { CTTAdress } = require('../config/index-conf');
const buyCtAddress = CTTAdress.buy;
const coinbaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';


class BuyController {
    @Post('/msg/buy')
    async buy(ctx) {
        const { from, to, mark, foodId, circulationFileHref } = ctx.request.body;
        // 录入买消息
        const msgId = this.getMSGId();
        const buyIns = new web3.eth.Contract(buyAbi, buyCtAddress);
        await buyIns.methods.createTrade(from, to, msgId, mark, foodId, circulationFileHref).send({ from: coinbaseAccount });
        ctx.success(ctx.request.body);
    }

    getMSGId() {
        const date = new Date();
        return `MSG${date.getFullYear()}${date.getMonth() + 1}${date.getDay()}${date.getTime()}`;
    }

    @Post('/msg/get')
    async get(ctx) {
        const { address } = ctx.request.body;
        const buyIns = new web3.eth.Contract(buyAbi, buyCtAddress);
        const res = await buyIns.methods.msgReceive(address).call();
        const resultMsgs = [];
        res.forEach(msg => {
            const obj = {
                msgId: msg[0],
                from: msg[1],
                to: msg[2],
                isvalid: msg[3],
                state: msg[4],
                kind: msg[5]
            };
            const circulationInfo = {
                fromUser: msg[7][0],
                to: msg[7][1],
                mark: msg[7][2],
                foodId: msg[7][3],
                circulationFileHref: msg[7][4]
            };
            obj['circulationInfo'] = circulationInfo;
            resultMsgs.push(obj);
        });
        ctx.success(resultMsgs);
    }


    @Post('/msg/send')
    async send(ctx) {
        const { address } = ctx.request.body;
        const buyIns = new web3.eth.Contract(buyAbi, buyCtAddress);
        const res = await buyIns.methods.msgSend(address).call();
        ctx.success(res);
    }

    @Post('/msg/comfirm')
    async comfirm(ctx) {
        const {msgId} = ctx.request.body;
        // TODO: 消息状态设置为已读
        const buyIns = new web3.eth.Contract(buyAbi, buyCtAddress);
        const res = await buyIns.methods.setState(msgId).send({from:coinbaseAccount});
        ctx.success(ctx.request.body);
        // TODO: 绑定批次信息
        // TODO: 修改食品拥有关系
    }
}