import { createConnection } from 'typeorm';
import { ormConfig } from '../config/index-conf';

// commonjs 导出对象才能保持引用特性，避免值拷贝
let mysql = { NULL: true };

async function init() {
    if (Reflect.has(mysql, 'NULL')) {
        const orm = await createConnection(ormConfig);
        // 标志当前对象非空
        mysql.NULL = false;
        mysql.orm = orm;
    }
}

// 可获取完整的 orm 对象
function getOrm() {
    return mysql.orm;
}

export {
    init,
    getOrm
};