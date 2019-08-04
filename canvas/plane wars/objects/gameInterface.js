/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 20:39:42
 * @LastEditTime: 2019-08-04 21:14:07
 * @Description:  游戏界面操作接口，包括：开始，暂停，结束等的显示渲染
 */
class GameInterface {
  constructor ({gameObj}) {
    // 游戏对象
    this.gameObj = gameObj
    // canvas的offsetLeft
    this.canvasLeft = this.gameObj.canvas.offsetLeft
    // '飞机大战' 图片绘制参数
    this.beiginName = {
      image: this.gameObj.images.name,
      w: 429 * 0.7,
      h: 84 * 0.7,
      x: this.gameObj.canvas.width / 2 - 429 * 0.7 / 2,
      y: 20
    }
    // '开始游戏' 字体绘制参数
    this.beginText = {
      text: '开始游戏',
      x: this.gameObj.canvas.width / 2 - 60,
      y: this.gameObj.canvas.height / 2,
      w: 130,
      h: 30
    }
  }

  // 绘制游戏开始界面
  printBegin () {
    this.gameObj.ctx.clearRect(0, 0, this.gameObj.canvas.width, this.gameObj.canvas.height)
    this.gameObj.background.render()
    // '飞机大战' 图片刻画
    this.gameObj.ctx.drawImage(this.beiginName.image, this.beiginName.x, this.beiginName.y, this.beiginName.w, this.beiginName.h)
    // 开始游戏 字体刻画
    this.gameObj.ctx.textAlign = 'left'
    this.gameObj.ctx.font = '30px 黑体'
    this.gameObj.ctx.fillText(this.beginText.text, this.beginText.x, this.beginText.y)
  }

  // ’开始游戏‘ 点击
  beginClick (callback) {
    this.gameObj.canvas.onmousedown = (e) => {
      let nowX = e.x - this.canvasLeft
      let nowY = e.y
      // 判断是否点击到 '开始游戏'
      if (
        nowX > this.beginText.x && nowX < this.beginText.x + this.beginText.w && 
        nowY > this.beginText.y && nowY < this.beginText.y + this.beginText.h) {
        callback()
      }
    }
  }

  printOver () {
    this.gameObj.ctx.clearRect(0, 0, this.gameObj.canvas.width, this.gameObj.canvas.height)
     // 最高分数
     this.gameObj.scoreUtil.setMaxScore()
     let maxScore = this.gameObj.scoreUtil.getMaxScore()
     this.gameObj.ctx.drawImage(this.gameObj.images.gameover, 0, 0, this.gameObj.canvas.width, this.gameObj.canvas.height)
     this.gameObj.ctx.font = "60px 黑体"
     this.gameObj.ctx.fillText(maxScore, this.gameObj.canvas.width / 2 - 100, this.gameObj.canvas.height / 2 - 30)
     this.gameObj.ctx.font = "60px 黑体"
     this.gameObj.ctx.fillText(this.gameObj.scoreUtil.score, this.gameObj.canvas.width / 2 - 100, this.gameObj.canvas.height / 2 + 200)
 
     window.addEventListener('click', e => {
       location.reload()
     })
  }
}

export default GameInterface