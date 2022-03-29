// 自己实现 控制台列表 展示
const EventEmiter = require('events')
const readline = require('readline')
const MuteStream = require('mute-stream')
const { fromEvent } = require('rxjs')
const ansiEscapes = require('ansi-escapes')

const option = {
  type: 'list',
  name: 'name',
  message: 'please select your name:',
  chioces: [
    { name: '张三', value: 'zhangsan' },
    { name: '李四', value: 'lisi' },
    { name: '王五', value: 'wangwu' },
  ]
}

// 主函数 返回 Promise 对象
function promapt(options) {
  return new Promise((resolve, reject) => {
    try {
      const list = new TerminalList(options)
      list.on('exit', result => {
        resolve(result)
      })
      list.render()
    } catch (e) {
      reject(e)
    }
  })
}

// 控制台展示类，主要逻辑在此设置
class TerminalList extends EventEmiter {
  constructor(options) {
    super()
    // options 信息
    this.name = options.name
    this.message = options.message
    this.chioces = options.chioces

    // 输入输出流
    this.input = process.stdin
    // 使用 mute-stream 设置输出的模式
    const ms = new MuteStream()
    ms.pipe(process.stdout)
    this.output = ms
    // 使用 readline 控制输入输出
    this.readline = readline.createInterface({
      input: this.input,
      output: this.output
    })

    // 当前选择的元素
    this.selected = 0
    // 列表高度
    this.height = this.chioces.length + 1

    // 监听 keypress 事件
    this.keypress = fromEvent(this.readline.input, 'keypress').forEach(this.onKeypress)

    // 是否已经选择
    this.haveSelected = false
  }

  // 监听用户输入的按键事件
  onKeypress = (keymap) => {
    // 判断按键类型
    const key = keymap[1]
    if(key.name === 'down') {
      this.selected++
      if(this.selected > this.chioces.length - 1) this.selected = 0
      this.render()
    }else if(key.name === 'up') {
      this.selected--
      if(this.selected < 0) this.selected = this.chioces.length - 1
      this.render()
    }else if(key.name === 'return') {
      this.haveSelected = true
      this.render()
      this.close()
      this.emit('exit', this.chioces[this.selected])
    }
  }

  // terminal的信息渲染
  render(){
    // 渲染时，解除静默
    this.output.unmute()
    this.clean()
    this.output.write(this.getContent())
    // 输出结束，设置静默，不允许用户输入
    this.output.mute()
  }

  // 获取要输出的信息
  getContent(){
    let title = ''
    if(this.haveSelected) {
      // 选择结束
      const name = this.chioces[this.selected].name
      let title = `\x1B[32m?\x1B[39m \x1B[1m` + this.message + ' \x1B[22m\x1B[0m\x1B[36m' + name + '\x1B[39m\x1B[0m' + '\n'
      return title
    }else{
      // 选择中的逻辑
      title = `\x1B[32m?\x1B[39m \x1B[1m` + this.message + '\x1B[22m' + ' (Use arrow keys)' + '\x1B[22m' + '\n'
      this.chioces.forEach((chioce, index) => {
        // 不是最后一个元素，需要加 \n
        const suffix = this.chioces.length - 1 === index ? '' : '\n'
        let line = ''
        if(this.selected === index) {
          line = '\x1B[36m> ' + chioce.name + '\x1B[39m' + suffix
        }else {
          line = '  ' + chioce.name + suffix
        }
        title += line
      })
    }
    return title
  }
  // terminal清屏
  clean(){
    // 生成擦除的空行的数量
    const empty = ansiEscapes.eraseLines(this.height)
    this.output.write(empty)
  }
  // 选择结束
  close(){
    this.output.unmute()
    this.readline.output.end()
    this.readline.pause()
    this.readline.close()
  }
}


promapt(option).then(res => {
  console.log('list result', res)
})