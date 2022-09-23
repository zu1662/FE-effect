/*
 * @Date         : 2022-09-22 18:53:05
 * @LastEditors  : zu1662
 * @LastEditTime : 2022-09-23 10:34:00
 * @Description  : 手写 Promise 实现
 * 
 * Copyright © 2022 by zu1662, All Rights Reserved. 
 */


class MyPromise {
  constructor(executor){
    this.status = 'pending' // 初始状态为 等待
    
    this.value = null // 成功的值
    this.reason = null // 失败的原因

    this.onFulfilledCallbacks = [] // 成功回调函数数组
    this.onRejectedCallbacks = [] // 失败的回调函数数组

    const resolve = value => {
      // resolve 执行时， 状态调整为 fulfilled
      if(this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = value
        //  一旦resolve执行, 调用成功的回调函数
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = reason => {
      // reject 执行时， 状态调整为 rejected
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        //  一旦reject执行，调用失败的回调函数
        this.onRejectedCallbacks.forEach(fn => fn()) 
      }
    }

    // 用户传入的函数可能也会执行异常，所以这里用 try...catch 包裹
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  // then 结果回调执行
  then(onFulfilled, onRejected){

    // 初始化，防止为空
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const thenPromise =  new MyPromise((resolve, reject) => {
      // 封装 链式调用 判断逻辑
      const resolvePromise = (cb, result) => {
        // setTimeout 用于 微任务 的实现
        setTimeout(() => {
          try {
            const x = cb(result)
            if(x === thenPromise) { // 不能返回自身
              throw new Error('不能返回自身...')
            } else if( x instanceof MyPromise) { // 如果是 MyPromise 对象，调用 then 获取结果
              x.then(resolve, reject)
            } else { // 如果是 值，直接返回
              resolve(x)
            }
          } catch (err) {
            // 处理报错
            reject(err)
            throw err
          }
        })
      }
      if(this.status === 'fulfilled') {
        resolvePromise(onFulfilled, this.value)
      }

      if (this.status === 'rejected') {
        resolvePromise(onRejected, this.reason)
      }

      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => { // 将成功的回调函数放入成功数组
          resolvePromise(onFulfilled, this.value)
        })
        this.onRejectedCallbacks.push(() => { // 将失败的回调函数放入失败数组
          resolvePromise(onRejected, this.reason)
        })
      }
    })

    return thenPromise
  }

  /**
   *  Promise 提供了一些其他方法的实现
   *  Promise.prototype.catch()
   *  Promise.prototype.finally()
   */
  catch(onRejected){
    return this.then(null, onRejected)
  }

  finally(cb) {
    return this.then(value => {
      return MyPromise.resolve(cb()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }

  /**
   *  Promise 提供了一些其他方法的实现
   *  Promise.resolve()
   *  Promise.reject()
   *  Promise.all()
   *  Promise.race()
   *  Promise.any()
   */
  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

  static race(promises){
    return new MyPromise((resolve,reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject)
      }
    })
  }

  static all(promises) {
    let dataArr = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          dataArr[i] = data
          count++
          if(count === promises.length) {
            resolve(dataArr)
          }
        }, reject)
      }
    })
  }

  static any(promises) {
    let count = 0
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, err => {
          count++
          if(count === promises.length) {
            reject(new Error('All promises were rejected'))
          }
        })
      }
    })
  }
}

// MyPromise.resolve(11111111).then((res) => {
//   console.log(res);
// })

// MyPromise.reject(2222222).catch((err) => {
//   console.log(err);
// })

const p1 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve('p1')
  }, 2000)
}).then(res => {
  console.log(res);
})
// const p2 = new MyPromise(resolve => {
//   setTimeout(() => {
//     resolve('p2')
//   }, 1000)
// })

// const p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('err p3')
//   }, 3000)
// })

// const p4 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject('err p4')
//   }, 2000)
// })

// MyPromise.race([p1, p2]).then(res => {
//   console.log('race', res);
// })

// MyPromise.all([p1, p2]).then(res => {
//   console.log('all', res);
// }).finally(() => {
//   console.log('eeeeeeeeee');
// })

// MyPromise.any([p3, p4]).then(res => {
//   console.log('any then', res);
// })


// const test1 = new MyPromise((resolve, reject) => {
//   // throw new Error('aaaa')
//   resolve('aaaaaaaaaaaa')
// }).then(res => console.log(res), err => {
//   console.log('err', err);
// }).catch(err => {
//   console.log('catch', err);
// }).finally(() => {
//   console.log('ffffffffffffff');
// })

console.log(2)

// Promise.resolve(456).finally(()=>{
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve(123)
//     }, 3000);
//   })
// }).then(data=>{
//   console.log(data,'success')
// }).catch(err=>{
//   console.log(err,'error')
// })



