const coinBaseAccount = '0x34a1fee1c9bafc030e123cc85554f29318535c81';
const us = require('./bytecode/UserManager.json');
const fs = require('./bytecode/FoodStore.json');
const ec = require('./bytecode/Exchange.json');
const fl = require('./bytecode/batchFlow.json');
const buy = require('./bytecode/buy.json');
const Eth = require('web3');
const web3 = new Eth('http://127.0.0.1:8545');
const solbcObj = {
    us: us.object,
    fs: fs.object,
    ec: ec.object,
    fl: fl.object,
    buy: buy.object
};


//合约部署代码，需要调用 miner.start()
async function main() {
    const inputSol = process.argv.splice(2, 1).toString();
    if (!solbcObj[inputSol]) {
        const argvs = Object.keys(solbcObj).toString();
        console.log(`参数不允许, 只允许参数 ${argvs}`);
        process.exit();
    }
    await web3.eth.personal.unlockAccount(coinBaseAccount, '1', 600);
    const contract = await web3.eth.sendTransaction({
        from: coinBaseAccount,
        data: solbcObj[inputSol],
        gas: 0x47b760
    });
    console.log(contract);
}
main();