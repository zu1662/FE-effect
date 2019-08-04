import Background from './background.js'
import Food from './food.js'
import Snake from './snake.js'
import FPSUtil from './FPSUtil.js'
import ScoreUtil from './scoreUtil.js'

class Game {
  constructor ({canvasId, fps=60, cell = 10, clientWidth = 500, clientHeight = 500}) {
    // 画布宽高设置
    this.clientWidth = clientWidth
    this.clientHeight = clientHeight

    // 方块大小
    this.cell = cell
    // 页面canvas
    this.canvas = document.getElementById(canvasId)
    // canvas 上下文对象
    this.ctx = this.canvas.getContext('2d')
    // fps 每秒多少帧刷新
    this.fps = fps
    // 定时器，控制游戏刷新
    this.timer = null

    this._init()
  }

  _init () {
    this._setWindow()

    this.background = new Background({
      gameObj: this
    })
    this.food = new Food({
      gameObj: this
    })
    this.snake = new Snake({
      gameObj: this
    })
    this.fps = new FPSUtil({
      gameObj: this
    })
    this.scoreUtil = new ScoreUtil({
      gameObj: this
    })

    window.addEventListener('keydown', e => {
      this.snake.changeDir(e.keyCode)
    })

    window.addEventListener('keydown', e => {
      if(e.keyCode === 32) {
        if (this.timer) {
          this.gamePause()
        }else {
          this.gameStart()
        }
      }
    })

    // 刻画背景方格
    this.background.printStart(() => {
      this.gameStart()
    })
  }

  // 设置canva窗口属性
  _setWindow() {
    // 初始化canvas宽高
    let windowW = document.documentElement.clientWidth
    let windowH = document.documentElement.clientHeight
    // 大屏居中
    if (windowW > this.clientWidth) {
      this.canvas.style.marginLeft = windowW / 2 - this.clientWidth / 2 + 'px'
    }
    
    this.canvas.width = this.clientWidth > windowW ? windowW : this.clientWidth
    this.canvas.height = this.clientHeight > windowH ? windowH - 20 : this.clientHeight

    // 设置鼠标样式
    this.canvas.style.cursor = 'pointer'
    this.canvas.style.backgroundColor = '#f5f5f5'
  }

  // 游戏开始
  gameStart () {
    // 存在定时器，则返回
    if (this.timer) return
    
    this.food.render()

    this.timer = setInterval(() => {
      this.mainLoop()
    }, 1000 / this.fps)
  }

  // 游戏暂停
  gamePause () {
    this.timer = clearInterval(this.timer)
  }

  // 游戏结束
  gameOver () {
    // 清除定时器
    this.timer = clearInterval(this.timer)
    this.scoreUtil.setMaxScore()
    this.background.printEnd(this.scoreUtil.score, this.scoreUtil.getMaxScore())
  }

  // 主循环函数
  mainLoop () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fps.update()
    // 背景刻画
    this.background.renderBG()
    // 分数
    this.scoreUtil.render()
    // 刻画食物
    this.food.render()
    // 刻画蛇
    this.snake.update()
    this.snake.render()


  }
}

export default Game