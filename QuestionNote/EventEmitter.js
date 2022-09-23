// 发布订阅模式

class EventEmitter {
  constructor(){
    // map 存放订阅数据
    this._events = new Map()
  }

  on(eventName, callback) {
    const callbacks = this._events.get(eventName) || []
    callbacks.push(callback)
    this._events.set(eventName, callbacks)
  }

  once(eventName, callback) {
    const onecb = (...args) => {
      callback(...args)
      this.off(eventName, onecb)
    }

    // 订阅事件的时候，修改了原回调函数的引用，所以，用户触发 off 的时候不能找到对应的回调函数
    onecb.initCallback = callback
    this.on(eventName, onecb)
  }

  emit(eventName, ...args) {
    const callbacks = this._events.get(eventName) || []
    callbacks.forEach(callback => callback(args));
  }

  off(eventName, callback) {
    const callbacks = this._events.get(eventName) || []
    const newCallbacks = callbacks.filter(cb => cb !== callback && cb.initCallback != callback)
    this._events.set(eventName, newCallbacks)
  }
}


const events = new EventEmitter()

let cb = function(){
  console.log('hello cb');
}
events.on("hello", cb)

function once(){
  console.log("once");
}

events.once("hello", once)

events.emit("hello")

events.emit("hello")

setTimeout(() => {
  console.log('----- wait 2s -----');
  events.off('hello', cb)

  events.emit("hello")
}, 2000)