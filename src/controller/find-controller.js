/* eslint-disable no-unused-vars */
const { Post, Get } = require('../util/decorators');
const { web3 } = require('../loader/index');
const exchangeContractAbi = require('../source/exchange-contract-abi-v1.0.json');
const contractAddress = '0xf13ae0160A4Df60182D480Ef9BCFc38dE29E52bF';
const coinbaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';
const { Readable } = require('stream');

const { getFoodInfoById, getUserInfoByAddress } = require('../service/user.js');

class FindController {

    // 根据批次ID寻找溯源信息
    @Post('/exchange/batch')
    async batach(ctx) {
        const { batchId } = ctx.request.body;
        // 产品交易信息合约实例化
        const exchangeCtIns = new web3.eth.Contract(exchangeContractAbi, contractAddress);
        const batchExchangeInfo = await exchangeCtIns.methods.getInfo(batchId).call();
        const batchInfoAfter = [];
        for(let i = 0; i < batchExchangeInfo.length; i++) {
            const obj = {
                from: batchExchangeInfo[i][0],
                to: batchExchangeInfo[i][1],
                time: batchExchangeInfo[i][2],
                foodId: batchExchangeInfo[i][3],
                circulationFileHref: batchExchangeInfo[i][4]
            };
            const fromUserInfo = await getUserInfoByAddress(obj.from);
            const toUserInfo = await getUserInfoByAddress(obj.to);
            obj['fromName'] = fromUserInfo.name;
            obj['toName'] = toUserInfo.name;
            batchInfoAfter.push(obj);
        }
        ctx.success(batchInfoAfter);
    }

    async getFoodInfoById(foodId) {

    }

    // 录入某批次交易流转信息
    @Post('/exchange/input')
    async input(ctx) {
        const { fromuser, touser, time, foodId, circulationFileHref, batchId } = ctx.request.body;
        const exchangeCtIns = new web3.eth.Contract(exchangeContractAbi, contractAddress);
        const batchExchangeInfo = await exchangeCtIns.methods.inputInfo(fromuser,
            touser, time, foodId, circulationFileHref, batchId).send({ from: coinbaseAccount });
        ctx.success(ctx.request.body, '附加录入的批次流转信息');
    }
}