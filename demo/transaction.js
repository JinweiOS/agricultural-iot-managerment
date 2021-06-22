const Eth = require('web3');
const eth = new Eth('http://43.130.11.26:8545');
async function main() {
    await eth.eth.personal.unlockAccount('0xebf844ec4e67d5007051dacca8530b53179244e0', '1', 6000000);
    const result = await eth.eth.sendTransaction({
        from: '0xebf844ec4e67d5007051dacca8530b53179244e0',
        to: '0xFeFcA80cC595660595dAA402964122828463F677',
        value: '100000000000000000000000'
    }, '1');

    console.log(result);
}
main();

