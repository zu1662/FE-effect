class Background {
  constructor ({gameObj}) {
    this.gameObj = gameObj
    // 每个背景格的大小
    this.cell = this.gameObj.cell
    //  canvas的offset
    this.canvasLeft = this.gameObj.canvas.offsetLeft
    this.canvasTop = this.gameObj.canvas.offsetTop
    // 开始游戏参数
    this.startText = '开始游戏'
    this.startTextW = 140
    this.startTextH = 30
    this.startTextX = this.gameObj.clientWidth / 2 - this.startTextW / 2
    this.startTextY = this.gameObj.clientHeight / 2 - this.startTextH / 2
  }

  // 刻画游戏开始界面
  printStart (callback) {
    this.renderBG()
    this.gameObj.ctx.font = '30px 黑体'
    this.gameObj.ctx.fillText(this.startText, this.startTextX, this.startTextY)

    window.addEventListener('click', e => {
      let nowX = e.x - this.canvasLeft
      let nowY = e.y - this.canvasTop
      // 判断是否点击到 '开始游戏'
      if (
        nowX > this.startTextX && nowX < this.startTextX + this.startTextW && 
        nowY > this.startTextY - this.startTextH / 2 && nowY < this.startTextY) {
        callback()
      }
    })
  }
  // 刻画游戏结束界面
  printEnd (score, maxScore) {
    this.renderBG()
    this.gameObj.ctx.font = '30px 黑体'
    this.gameObj.ctx.fillStyle = '#000'
    this.gameObj.ctx.fillText('游戏结束', this.startTextX, this.startTextY - 60)
    this.gameObj.ctx.fillText(`最高分数：${maxScore}`, this.startTextX, this.startTextY + 40)
    this.gameObj.ctx.fillText(`当前分数：${score}`, this.startTextX, this.startTextY + 80)

    window.addEventListener('click', e => {
      location.reload()
    })
  }

  // 刻画背景的放歌
  renderBG() {
    let rowNum = Math.ceil(this.gameObj.clientWidth / this.cell)
    let colNum = Math.ceil(this.gameObj.clientHeight / this.cell)
    this.gameObj.ctx.beginPath();
    this.gameObj.ctx.strokeStyle  = '#ccc'
    for (let i = 0; i < rowNum; i++) {
      this.gameObj.ctx.moveTo(0, i * this.cell );
      this.gameObj.ctx.lineTo(this.gameObj.clientWidth, i * this.cell);
      this.gameObj.ctx.stroke();
    }

    for (let i = 0; i < colNum; i++) {
      this.gameObj.ctx.moveTo(i * this.cell, 0);
      this.gameObj.ctx.lineTo(i * this.cell, this.gameObj.clientHeight);
      this.gameObj.ctx.stroke();
    }
  }
}

export default Background