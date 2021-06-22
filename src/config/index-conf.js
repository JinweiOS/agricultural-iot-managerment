const ormConfig = {
    'type': 'mysql',
    'host': '120.79.56.127',
    'port': 3306,
    'username': 'root',
    'password': 'f9yihLiai=E2',
    'database': 'mysqldumptest',
    'synchronize': true,
    'entities': [
        // 数据库实体类的定义文件
        'dist/database/entity/*.js'
    ]
};
const CTTAdress = {
    us: '0x09b2c43D8a779c31F4C20C1d664168e6fE51248B',
    fs: '0xbAE05E10c92A756Beb316898cABf0cce16E5C2d1',
    ec: '0xDDbA046808F831bD6cCC5c53F872365Ce258D297',
    fl: '0x97C671fC30B90AfC80F81F3d451de7c389C23cDD',
    buy: '0x611dC32eC173dDaFfF8d66fb4522c37D9Bc4F3E2',
    coinbaseAddress: '0x450f84AD43C9D0c6C680F0eBE0693137D0b9A294'
};
module.exports = {
    ormConfig,
    CTTAdress
};