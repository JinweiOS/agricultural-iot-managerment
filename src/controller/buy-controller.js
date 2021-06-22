/* eslint-disable no-unused-vars */
const { Post } = require('../util/decorators');
const buyAbi = require('../source/buy-contract-abi.json');
const { web3 } = require('../loader/index');
const { CTTAdress } = require('../config/index-conf');
const buyCtAddress = CTTAdress.buy;
const coinbaseAccount = CTTAdress.coinbaseAddress;
const {getFl, setFl} = require('../service/fl');


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
    }

    @Post('/fl/input')
    async input(ctx) {
        const {address,foodId, batchId} = ctx.request.body;
        console.log(ctx.request.body);
        const addressFoodId = address + foodId;
        await setFl(addressFoodId, batchId);
        ctx.success(ctx.request.body);
    }

    @Post('/fl/get')
    async flGet(ctx) {
        const {af} = ctx.request.body;
        const batchId = await getFl(af);
        ctx.success(batchId);
    }
}