import StaticResourcesUtil from './objects/staticResourcesUtil.js'
import FPSUtil from './objects/FPSUtil.js'
import GameInterface from './objects/gameInterface.js'
import Background from './objects/background.js'

class Game {
  constructor({ canvasId, fps = 60 , clientWidth = 394, clientHeight = 700}) {
    // 画布宽高设置
    this.clientWidth = clientWidth
    this.clientHeight = clientHeight
    // 游戏是否结束 flag
    this.gameEnd = false
    // 页面canvas
    this.canvas = document.getElementById(canvasId)
    // canvas 上下文对象
    this.ctx = this.canvas.getContext('2d')
    // fps 每秒多少帧刷新
    this.fps = fps
    // 定时器，控制游戏刷新
    this.timer = null
    // 资源对象
    this.images = null
    // game.json 地址
    this.gameJsonPath = './game.json'

    this._init()
  }

  // 游戏初始化
  _init() {
    // 设置canva窗口属性
    this._setWindow()

    // 实例化fps对象，管理fps
    this.fpsUtil = new FPSUtil()

    // 实例化静态资源对象，加载图片资源
    const SR = new StaticResourcesUtil()
    SR.loadImageArray(this.gameJsonPath, (alreadyLoadNum, allImagesNum, imagesObj) => {
      // 清屏canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      //打印当前加载图片个数
      this.ctx.font = "20px 黑体";
      this.ctx.fillText(`正在加载资源 ${alreadyLoadNum} / ${allImagesNum}`, this.canvas.width / 2 - 100, this.canvas.height / 2);
      //如果已经加载的图片个数，等于了图片总数，那么运行游戏
      if (alreadyLoadNum == allImagesNum) {
          this.images = imagesObj

          // 初始化背景图片对象
          this.background = new Background({
            gameObj: this
          })
          
          // 初始化 GameInterface 对象
          this.interface = new GameInterface({
            gameObj: this
          })

          // 当图片加载完成后，显示开始游戏界面
          this.interface.printBegin()
          this.interface.beginClick(() => {
            this.gameStart()
          })
      }
    })
  }

  // 设置canva窗口属性
  _setWindow() {
    // 初始化canvas宽高
    let windowW = document.documentElement.clientWidth
    // 大屏居中
    if (windowW > this.clientWidth) {
      this.canvas.style.marginLeft = windowW / 2 - this.clientWidth / 2 + 'px'
    }
    
    this.canvas.width = this.clientWidth
    this.canvas.height = this.clientHeight

    // 设置鼠标样式
    this.canvas.style.cursor = 'pointer'
  }

  // 游戏开始
  gameStart () {
    // 存在定时器，则返回
    if (this.timer) return

    this.background.render()
    this.background.playAudio()

    this.timer = setInterval(() => {
      this.mainLoop()
    }, 1000 / this.fps)
  }

  // 游戏结束
  gameOver () {

  }

  // 游戏暂停
  gamePause () {
    // 背景音乐暂停
    this.background.pauseAudio()
    // 清除定时器
    this.timer = clearInterval(this.timer)
  }

  // 主循环函数
  mainLoop () {

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.fpsUtil.update()

    // 更新背景移动
    this.background.move()
    this.background.render()

    //打印fps
    this.ctx.font = "16px Consolas";
    this.ctx.fillText("FPS / " + this.fpsUtil.realFPS, 10, 20);
    //打印帧编号
    this.ctx.fillText("FNO / " + this.fpsUtil.currentFrame, 10, 40);

  }
}

export default Game