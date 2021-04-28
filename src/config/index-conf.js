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
module.exports = {
    ormConfig
};