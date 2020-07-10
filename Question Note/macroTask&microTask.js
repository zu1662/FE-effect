/**
 * 执行机制：

  执行一个宏任务（栈中没有就从事件队列中获取）

  执行过程中如果遇到微任务，就将它添加到微任务的任务队列中

  宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）

  当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染

  渲染完毕后，JS引擎线程继续，开始下一个宏任务（从宏任务队列中获取）

  async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

  文章地址： https://www.cnblogs.com/ZavierTang/p/ZavierTang.html
 */

console.log('script start')

setTimeout(function() {
    console.log('timer over')
}, 10)

Promise.resolve().then(function() {
  console.log('promise1')
}).then(function() {
  console.log('promise2')
})

async function async1(){
  console.log('async1 start');
   await async2();
   console.log('async1 end')
}
async function async2(){
   console.log('async2')
}
async1()


console.log('script end')

/**
 * 
    结果：
    script start
    async1 start
    async2
    script end
    promise1
    async1 end
    promise2
    timer over
  
    分析：
    主线程执行 ---> script start，
    遇到 setTimeout，放入 宏任务， 
    遇到 Promise.then() 放入 微任务 内，
    执行 async1 ---> async1 start async2， 
    遇到 await ，后面的逻辑放入 微任务 内，
    当前 主线程执行完毕 ---> script end,
    执行当前主线程内微任务 ----> promise1，
    遇到 Promise.then() 再次放入 微任务 内，
    执行当前主线程内微任务 ----> async1 end，
    执行当前主线程内微任务 ----> promise2，
    执行 宏任务 ---> timer over
 */