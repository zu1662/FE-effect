import Background from './background.js'
import Cat from './cat.js'
import Effect from './effect.js'

class Game {
  constructor ({domId, maskId, fps=60, cell = 50, row = 8, col = 8, cat = [{name: 'A', color: 'red'}], effect = 2 }) {
    this.domNode = document.getElementById(domId)
    this.maskNode = document.getElementById(maskId)
    // 画布宽高设置
    this.clientWidth = cell * col
    this.clientHeight = cell * row
    this.row = row
    this.col = col
    this.mazeArr = []
    // 方块大小
    this.cell = cell
    // 定时器，控制游戏刷新
    this.timer = null
    this.catArr = []
    this.catInfo = cat

    this._init()
  }

  _init () {
    this._setWindow()
    this._setMaze()

    this.background = new Background({
      gameObj: this
    })

    this.background.renderBG()

    this.effect1 = new Effect({ gameObj: this })
    this.effect2 = new Effect({ gameObj: this })

    this.catInfo.forEach(c => {
      const catIns = new Cat({ gameObj: this, name: c.name, color: c.color })
      this.catArr.push(catIns)
    })

    this.gameStart()
  }

  // 设置窗口属性
  _setWindow() {
    // 初始化宽高
    let windowW = document.documentElement.clientWidth
    let windowH = document.documentElement.clientHeight
    // 大屏居中
    if (windowW > this.clientWidth) {
      this.domNode.style.marginLeft = windowW / 2 - this.clientWidth / 2 + 'px'
    }
    
    this.domNode.style.width = this.clientWidth > windowW ? windowW : this.clientWidth
    this.domNode.style.height = this.clientHeight > windowH ? windowH - 20 : this.clientHeight
  }

  // 生成迷宫数组
  _setMaze(){
    let mazeArr = []
    /**
     * 1. row & col 第二和倒数第二行为黑色
     * 2. 
     */
    for (let i = 0; i < this.row; i++) {
      let rowArr = []
      for (let j = 0; j < this.col; j++) {
        if(((i === 1 || i === this.row - 2) && j > 0 && j < this.col - 1 && j !== 3) || 
            ((j === 1 || j === this.col - 2) && i > 0 && i < this.row - 1 && i !== 3) ||
            ((i === 3 || i === 4) && (j === 3 || j === 4))
        ) {
          rowArr.push({ type: 0, hasCat: false, hasEffect: false })
        } else {
          rowArr.push({ type: 1, hasCat: false, hasEffect: false })
        }
      }
      mazeArr.push(rowArr)
    }

    this.mazeArr = mazeArr
  }

  // 游戏开始
  gameStart () {
    // 存在定时器，则返回
    if (this.timer) return
    
    this.timer = setInterval(() => {
      this.mainLoop()
    }, 1000)
  }

    // 游戏结束
    gameOver () {
      // 清除定时器
      this.timer = clearInterval(this.timer)
      this.maskNode.classList = 'show'
    }


  // 主循环函数
  mainLoop () {
    this.catArr.forEach(c => {
      c.update()
    })

    this.effect1.update()
    this.effect2.update()
  }
}

export default Game