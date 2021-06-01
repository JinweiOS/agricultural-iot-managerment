const { web3 } = require('../loader/index');
const userContractAbiV1Json = require('../source/user-contract-abi-v1.0.json');
const {CTTAdress} = require('../config/index-conf.js');
const contractAddress = CTTAdress.us;
//const coinbaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';

// 获取以太坊用户个人信息
async function getUserInfoByAddress(address) {
    const userCtIns = new web3.eth.Contract(userContractAbiV1Json, contractAddress);
    const userInfo = await userCtIns.methods.getUserInfo(address).call();
    return {
        address: userInfo[0],
        name: userInfo[1],
        joinTime: userInfo[2],
        desc: userInfo[3],
        location: userInfo[4],
        reviewFileHref: userInfo[5],
        role: userInfo[6],
        review: userInfo[7]
    };
}

module.exports = {
    getUserInfoByAddress
};