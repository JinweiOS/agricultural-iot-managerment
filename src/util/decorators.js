/** @file 定义methodFactory工厂函数，生产 Get, Post, Put, Delete 注解函数*/

/**
* @constant Map<Object, Array<object>> key是装饰器函数中的target对象, 数组中的对象是
*   {url: string, method: string, fn: Function}类型的对象
*/
const controllerMap = new Map();

const /** @constant Map<string, Set<string>> */ urlsMap = new Map();

/**
 * 生成装饰器函数
 * @param {string} method 装饰器类型, 值为Http中的方法
 * @returns {Function} 装饰器函数
 */
function methodFactory(method) {
    return (url) => {
        return (target, key, descriptor) => {
            // 同一个方法下路径不可重复，重复则抛出错误
            if (urlsMap.has(method)) {
                let urlSet = urlsMap.get(method);
                if (urlSet.has(url)) {
                    throw new Error(`${method} ${url} 路径重复！`);
                } else {
                    urlSet.add(url);
                }
            } else {
                urlsMap.set(method, new Set([url]));
            }
            // 将同一class中的所有方法放置于数组中
            if (controllerMap.has(target)) {
                controllerMap.get(target).push({ method, url, fn: descriptor.value });
            } else {
                controllerMap.set(target, [{ method, url, fn: descriptor.value }]);
            }
        };
    };
}

module.exports = {
    Post: methodFactory('post'),
    Get: methodFactory('get'),
    Put: methodFactory('put'),
    Delete: methodFactory('delete'),
    controllerMap
};
