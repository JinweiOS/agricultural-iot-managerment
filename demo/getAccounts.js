/**
 * 通过web3.js 获取所有用户信息
 */

const Eth = require('web3');
const eth = new Eth('http://43.130.11.26:8545');
// console.log(eth)

// 只有在async函数中，才可以使用await
async function main() {
    // pjw
    // await eth.eth.personal.importRawKey('c857a559ee3ae1a7575d5990b82e7fe430fd713f6b210b06e1d67d6c6240a73b', '!QAZ2wsx')
    // // wyy
    // await eth.eth.personal.importRawKey('c160730079b4c14294078a28f1ef1ded5b21aaaacc4fab0cf80fc59d0d3cd232', '!QAZ2wsx')
    const accounts = await eth.eth.personal.getAccounts();
    console.log(accounts);
}
main();