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
    us: '0xab74cA27161146FccaCf099ea591f05504b4aac3',
    fs: '0xFAE8D35C528699a95E4fD59237682C97755722aa',
    ec: '0xeE03265D16846c1357d18B7B52c8Ead0cB1B6369',
    fl: '0xED56FdcE4B3397c02E61B01867db275291eb4443',
    buy: '0xf13ae0160A4Df60182D480Ef9BCFc38dE29E52bF'
};
module.exports = {
    ormConfig,
    CTTAdress
};