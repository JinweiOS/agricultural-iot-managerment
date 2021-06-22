const {CTTAdress} = require('../config/index-conf.js');
const contractAddress = CTTAdress.fl;
const { web3 } = require('../loader/index');
const flAbi = require('../source/batch-flow-contract-abi.json');
const coinbaseAccount = CTTAdress.coinbaseAddress;

async function setFl(addressFoodId, batchId) {
    const flIns = new web3.eth.Contract(flAbi, contractAddress);
    await flIns.methods.store(addressFoodId, batchId).send({from: coinbaseAccount});
    return true;
}

async function getFl(addressFoodId) {
    const flIns = new web3.eth.Contract(flAbi, contractAddress);
    const batchId = await flIns.methods.getBatch(addressFoodId).call();
    return batchId;
}

module.exports = {
    getFl,
    setFl
};