/* eslint-disable no-unused-vars */
const { web3 } = require('../loader');
const foodContractAbi = require('../source/food-contract-abi.json');
const { Post, Get } = require('../util/decorators');


const {CTTAdress} = require('../config/index-conf.js');
const foodContractAddress = CTTAdress.fs;
const coinbaseAccount = CTTAdress.coinbaseAddress;

class FoodController {

    @Post('/food/input/owner')
    async ownerInput(ctx) {
        const {foodId, address} = ctx.request.body;
        const foodCtIns = new web3.eth.Contract(foodContractAbi, foodContractAddress);
        let res = await foodCtIns.methods.getOwerFoodInfo(address).call();
        if (res !== '') {
            res = res + `,${foodId}`;
        }
        await foodCtIns.methods.inputFoodOwnerInfo(res, address).send({ from: coinbaseAccount });
        ctx.success(ctx.request.body);
    }

    @Post('/food/input')
    async input(ctx) {
        const { owner, foodName, image, advertiseSlogan, eatMethods, location, processFlow, storageCondition, afterSalesService, priceDescription, detailFoodFileHref } = ctx.request.body;
        console.log(ctx.request.body);

        console.log(coinbaseAccount);
        // 生成foodId
        const foodId = this.getFoodId();
        const foodCtIns = new web3.eth.Contract(foodContractAbi, foodContractAddress);
        // 录入农产品信息
        await foodCtIns.methods.store(owner, foodId, foodName, image, advertiseSlogan, eatMethods, location, processFlow, storageCondition, afterSalesService, priceDescription, detailFoodFileHref).send({ from: coinbaseAccount });
        // 录入所属关系
        // 先获取农产品拥有数组
        let res = await foodCtIns.methods.getOwerFoodInfo(owner).call();
        if (res !== '') {
            res = res + `,${foodId}`;
        }
        await foodCtIns.methods.inputFoodOwnerInfo(res, owner).send({ from: coinbaseAccount });
        ctx.success(ctx.request.body);
    }

    getFoodId() {
        const date = new Date();
        return `F${date.getFullYear()}${date.getMonth() + 1}${date.getDay()}${date.getTime()}`;
    }

    @Get('/food/all')
    async getAllFoodInfo(ctx) {
        const foodCtIns = new web3.eth.Contract(foodContractAbi, foodContractAddress);
        const res = await foodCtIns.methods.getAllFoods().call();
        const rtnArr = [];
        res.forEach(food => {
            const obj = {
                user: food[0],
                foodName: food[1],
                images: food[2],
                advertiseSlogan: food[3],
                eatMethods: food[4],
                location: food[5],
                processFlow: food[6],
                storageCondition: food[7],
                afterSalesService: food[8],
                priceDescription: food[9],
                detailFoodFileHref: food[10],
                foodId: food[11]
            };
            rtnArr.push(obj);
        });
        ctx.success(rtnArr);
        // 录入所属关系 
    }

    @Post('/food/owner')
    async getMyFood(ctx) {
        const { address } = ctx.request.body;
        const foodCtIns = new web3.eth.Contract(foodContractAbi, foodContractAddress);
        const res = await foodCtIns.methods.getOwerFoodInfo(address).call();
        ctx.success(res);
    }

    @Post('/food/one')
    async one(ctx) {
        const {foodId} = ctx.request.body;
        const foodCtIns = new web3.eth.Contract(foodContractAbi, foodContractAddress);
        const res = await foodCtIns.methods.getFoodInfo(foodId).call();
        const obj = {
            owner: res['0'],
            foodId: res['1'],
            images: res['2'],
            foodName: res['3'],
            eatMethods: res['4'],
            detailFoodFileHref: res['5'],
            location: res['6'],
            priceDescription: res['7'],
            processFlow: res['8'],
            storageCondition: res['9'],
            afterSalesServic: res['10'],
        };
        ctx.success(obj);
    }

    @Post('/file/upload')
    async upload(ctx) {
        ctx.success(ctx.request.files);
    }
}