/* eslint-disable no-unused-vars */
const {CTTAdress} = require('../config/index-conf.js');
const foodContractAddress = CTTAdress.fs;
const { web3 } = require('../loader');
const foodContractAbi = require('../source/food-contract-abi.json');
// const coinbaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';

async function getFoodInfoById(foodId) {
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
    return obj;
}

module.exports = {
    getFoodInfoById
};