// 自己实现 Nodejs Readline 功能

// 主函数
function stepRead(callback){

  // 接受到keypress事件的值后，进行输出处理
  function onKeypress(s){
    output.write(s)
    line += s
    switch(s){
      case '\r': // 用户回车时，中断
        input.pause()
        callback(line)
        break
    }
  }

  // 拿到输入输出流
  const input = process.stdin
  const output = process.stdout
  // 缓存用户输入行
  let line = ''

  // 把拿到的输入进行广播处理
  emitsKeyPressEvents(input)
  input.on('keypress', onKeypress)

  // 设置逐字处理模式
  input.setRawMode(true)
  input.resume()
}


// 生成 generator 函数，进行 yeild
function* emitKeys(stream){
  // 只要有用户输入就一直 yeild
  while(true) {
    let ch = yield
    stream.emit('keypress', ch)
  }
}
function emitsKeyPressEvents(stream) {
  // 有数据返回时进行监听
  function onData(chunk) {
    g.next(chunk.toString())
  }
  // 生成 generator 函数，并调用一次
  const g = emitKeys(stream)
  g.next()

  // 关键的输入数据监听
  stream.on('data', onData)
}


stepRead(str => {
  console.log('input:', str)
})