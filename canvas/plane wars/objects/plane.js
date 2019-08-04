/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-04 14:19:38
 * @LastEditTime: 2019-08-04 20:38:46
 * @Description:  飞机类
 */
class Plane {
  constructor ({gameObj}) {
    // 游戏对象
    this.gameObj = gameObj
    // 飞机图片对象
    this.image = this.gameObj.images.hero
    // 飞机死亡图片
    this.dieImageArr = [
      this.gameObj.images.hero1,
      this.gameObj.images.hero2,
      this.gameObj.images.hero3,
      this.gameObj.images.hero4
    ]
    this.dieFrame = 0
    // 飞机的存活状态
    this.liveState = true

    // 飞机的状态（子弹状态）
    this.state = [{
      type: 1,
      num: null
    }]
    // 飞机大小
    this.w = 100
    this.h = 124
    // 飞机的初始位置
    this.x = this.gameObj.canvas.width / 2 - this.w / 2
    this.y = this.gameObj.canvas.height - this.h / 2

    // canvas的offset
    this.canvasLeft = this.gameObj.canvas.offsetLeft
    this.canvasTop = this.gameObj.canvas.offsetTop

    // 补给的子弹数
    this.hasBulletNum = null

    // 所有已发射的子弹
    this.bulletArr = []
    
    this.move()
  }

  // 飞机移动
  move () {
    window.addEventListener('mousemove', e => {
      let nowx = e.x - this.canvasLeft
      let nowy = e.y - this.canvasTop

      // x轴方向
      if (nowx < 0 + this.w / 2) {
        this.x = 0
      }else if (nowx > this.gameObj.canvas.width - this.w / 2) {
        this.x = this.gameObj.canvas.width - this.w
      }else {
        this.x = nowx - this.w / 2
      }
      // y轴方向
      if (nowy < 0 + this.h / 2) {
        this.y = 0
      }else if (nowy > this.gameObj.canvas.height - this.h / 2) {
        this.y = this.gameObj.canvas.height - this.h
      }else {
        this.y = nowy - this.h / 2
      }
    })

    window.addEventListener('touchmove', e => {
      let nowx = e.x - this.canvasLeft
      let nowy = e.y - this.canvasTop

      // x轴方向
      if (nowx < 0 + this.w / 2) {
        this.x = 0
      }else if (nowx > this.gameObj.canvas.width - this.w / 2) {
        this.x = this.gameObj.canvas.width - this.w
      }else {
        this.x = nowx - this.w / 2
      }
      // y轴方向
      if (nowy < 0 + this.h / 2) {
        this.y = 0
      }else if (nowy > this.gameObj.canvas.height - this.h / 2) {
        this.y = this.gameObj.canvas.height - this.h
      }else {
        this.y = nowy - this.h / 2
      }
    })
  }
  // 飞机获取到补给
  getSupply (type, num) {
    // 设置当前子弹状态
    if(type === 1) {
      let nowType = this.state.slice(-1, )[0].type
      if (nowType === 3) return
      nowType ++
      this.state.push({
        type: nowType,
        num: num
      })
    } else {
      this.state.push({
        type: 4,
        num: num
      })
    }
  }

  // 飞机发射子弹
  fire () {
    // 控制生成子弹速度
    if (this.gameObj.fpsUtil.currentFrame % 10 !== 0) return
    if (this.state.length > 1) {
      let nowStateNum = this.state.slice(-1, )[0].num
      nowStateNum --
      if (nowStateNum <= 0) {
        this.state.pop()
      }else {
        this.state[this.state.length - 1].num = nowStateNum
      }
    }
    // 添加子弹
    this.gameObj.bulletManager.addBullet(this.state)
  }

  // 飞机刻画
  render () {
    // 飞机死亡动画
    if (!this.liveState) {
      this.dieFrame ++
      let dieImageIdx = Math.floor(this.dieFrame / 10)
      this.image = this.dieImageArr[dieImageIdx]
      if (this.dieFrame >= 40) {
        this.gameObj.gameOver()
        return
      }
    }
    this.gameObj.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}


export default Plane