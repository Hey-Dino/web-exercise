setTimeout(() => {
    console.log(1)
}, 0);

function delay(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) { }
}

delay(3000);
console.log(2);

/**
 * 3s后输出 2 1
 *     setTimeout() 方法的回调函数会被暂时放置在队列中。
 *     仅当渲染主线程执行完，才操作延时器的回调函数。
 */