function a() {
    console.log(1);
    Promise.resolve().then(function () {
        console.log(2);
    });
}
setTimeout(function () {
    console.log(3);
}, 0);

Promise.resolve().then(a);
console.log(5);

/**
 * 输出 5 1 2 3
 *     Promise、setTimeout均为异步任务，均会被放置于队列中。
 *     不同的是，Promise处于微队列，setTimeout处于延时队列，微队列的优先级高于延时队列。
 */