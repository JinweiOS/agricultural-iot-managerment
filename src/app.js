const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const path = require('path');
const { router } = require('./util/router');
const { init } = require('./loader/index');
const cors = require('@koa/cors');


/**
 * 由于orm框架挂载需要进行异步数据库操作，因此使用异步函数进行封装
 */
async function startApp() {
    // 跨域配置
    app.use(cors());
    // 挂在mysql
    // app.context.mysql = await createMysqlInstance();
    app.use(async (ctx, next) => {
        // 成功的返回值
        ctx.success = (resBody) => {
            ctx.body = { success: true, data: resBody };
        };
        ctx.file = (stream, fileName) => {
            ctx.set({
                'Content-Disposition': `attachment;filename=${fileName}`
            });
            ctx.body = stream;
        };
        await next();
    });
    app.use(
        koaBody({
            multipart: true,
            formidable: {
                uploadDir: path.join(__dirname, '../upload/'), // 上传目录
                keepExtensions: true, // 保持文件的后缀
                maxFieldsSize: 10485760, // 10mb
            },
        })
    );
    // 数据库初始化
    await init();
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(3000, console.log('请访问 http://localhost:3000 进行测试...'));
}
// 启动
startApp();

