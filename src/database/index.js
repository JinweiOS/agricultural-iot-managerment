import { createConnection } from 'typeorm';
import { ormConfig } from '../config/index-conf';

// 初始化数据库异步操作对象
const mysqlPromise = createConnection(ormConfig);

export {
    mysqlPromise
};