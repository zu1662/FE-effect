/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 17:30:14
 * @LastEditTime: 2019-08-03 20:17:48
 * @Description:  背景图片类
 */
class Background {
  constructor ({drawW = 394, drawH = 700, gameObj, bgSpeed = 1}) {
    // 游戏对象
    this.gameObj = gameObj
    // 背景图片
    this.image = gameObj.images.background
    // 刻画宽高
    this.drawW = drawW
    this.drawH = drawH
    
    // x轴，y轴位置
    this.x = 0
    this.y = -this.drawH

    // 背景移动速度
    this.speed = bgSpeed

    // 背景音乐对象
    this.bgAudio = null
  }

  // 刻画背景
  render () {
    this.gameObj.ctx.drawImage(this.image, this.x, this.y, this.drawW, this.drawH)
    this.gameObj.ctx.drawImage(this.image, this.x, this.y + this.drawH, this.drawW, this.drawH)
  }

  // 背景移动
  move () {
    this.y = this.y + this.speed
    // 超出0位置，还原为初始位置
    if (this.y > 0) {
      this.y = -this.drawH
    }
  }

  // 播放背景音乐
  playAudio () {
    this.bgAudio = document.createElement('AUDIO')
    this.bgAudio.src = 'assets/sounds/game_music.mp3'
    document.body.appendChild(this.bgAudio)
    this.bgAudio.loop = true
    this.bgAudio.volume = 0.5
    this.bgAudio.play()

  }

  // 暂停背景音乐
  pauseAudio() {
    if (this.bgAudio) {
      this.bgAudio.pause()
    }
  }
}

export default Background