class Snake {
  constructor ({gameObj}) {
    this.gameObj = gameObj
    this.cell = this.gameObj.cell

    this.snakeArr = []
    this.dir = 'right'

    this._initSnake()
  }

  _initSnake () {
    let rowNum = Math.ceil(this.gameObj.clientWidth / this.cell)
    let colNum = Math.ceil(this.gameObj.clientHeight / this.cell)
    let bodyX = Math.floor(colNum / 2) * this.cell
    let bodyY = Math.floor(rowNum / 2) * this.cell
    
    this.snakeArr.push({
      x: bodyX,
      y: bodyY
    })
  }

  render () {
    this.snakeArr.forEach (item => {
      this.gameObj.ctx.fillStyle = '#999'
      this.gameObj.ctx.fillRect(item.x, item.y, this.cell, this.cell)
    })
  }

  // 更新蛇的前进方向
  update () {
    if (this.gameObj.fps.currentFrame % 20 !== 0) return
    let firstCell = this.snakeArr[0]
    let nextCell = {
      x: firstCell.x,
      y: firstCell.y
    }
    switch (this.dir) {
      case 'left':
        nextCell.x = firstCell.x - this.cell
        break
      case 'right':
        nextCell.x = firstCell.x + this.cell
        break
      case 'up':
        nextCell.y = firstCell.y - this.cell
        break
      case 'down':
        nextCell.y = firstCell.y + this.cell
        break
    }

    // 碰到墙壁，游戏结束
    if (
      nextCell.x <= 0|| 
      nextCell.x >= this.gameObj.clientWidth || 
      nextCell.y <= 0 ||
      nextCell.y >= this.gameObj.clientHeight
    ) {
      this.gameObj.gameOver()
    }
    // 循环，判断是否碰到自己的身体
    this.snakeArr.forEach(item => {
      if (nextCell.x === item.x && nextCell.y === item.y) {
        this.gameObj.gameOver()
      }
    })

    // 碰到食物，增加身体
    if(nextCell.x === this.gameObj.food.x && nextCell.y === this.gameObj.food.y) {
      this.snakeArr.unshift(nextCell)
      // 生成新的事物
      this.gameObj.food.createNewFood()
      // 增加分数
      this.gameObj.scoreUtil.addScore(1)
    }else {
      this.snakeArr.pop()
      this.snakeArr.unshift(nextCell)
    }
  }

  changeDir(dirCode) {
    let dirText = this.dir
    switch (dirCode) {
      case 37:
        if (this.dir === 'right') return
        dirText = 'left'
        break
      case 38:
        if (this.dir === 'down') return
        dirText = 'up'
        break
      case 39:
        if (this.dir === 'left') return
        dirText = 'right'
        break
      case 40:
        if (this.dir === 'up') return
        dirText = 'down'
        break
    }
    this.dir = dirText
  }
}

export default Snake