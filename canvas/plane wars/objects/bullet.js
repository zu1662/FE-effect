/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 21:15:44
 * @LastEditTime: 2019-08-04 18:43:41
 * @Description:  子弹类管理文件
 */
class BulletManager {
  constructor ({gameObj}) {
    // game对象
    this.gameObj = gameObj
    // 所有子弹数组
    this.bulletArr = []
  }

  // 添加子弹
  addBullet (state) {
    let bullet
    // 根据飞机的状态判断使用哪种子弹
    switch (state.slice(-1, )[0].type) {
      case 1: // 原始子弹类型
        bullet = new BulletBase({
          gameObj: this.gameObj
        })
        break
      case 2: // 子弹类型1
        bullet = new Bullet1({
          gameObj: this.gameObj
        })
        break
      case 3: // 子弹类型2
        bullet = new Bullet2({
          gameObj: this.gameObj
        })
        break
      case 4: // 炸弹
        bullet = new Bomb({
          gameObj: this.gameObj
        })
        break
    }
    this.bulletArr.push(bullet)
  }

  // 更新所有子弹状态
  updateBullet () {
    this.bulletArr.forEach((item, index) => {
      // 如果子弹超出界面，则清除掉
      if (item.y < 0) {
        this.bulletArr.splice(index, 1)
      }
      item.update()
      item.render()

    })
  }

  // 删除子弹
  clearBullet (bullet) {
    this.bulletArr.splice(this.bulletArr.indexOf(bullet), 1)
  }
}
class BulletBase {
  constructor ({gameObj}) {
    // game对象
    this.gameObj = gameObj
    // 子弹图片
    this.image = this.gameObj.images.bullet
    // 子弹初始化位置
    this.x = this.gameObj.plane.x + this.gameObj.plane.w / 2
    this.y = this.gameObj.plane.y
    // 子弹宽高
    this.w = 22
    this.h = 22
    // 子弹速度
    this.speed = 20
    // 子弹杀伤力
    this.power = 1
    
  }

  // 更新子弹位置
  update () {
    // 子弹位置
    this.y = this.y - this.speed
  }

  // 刻画子弹
  render () {
    this.gameObj.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}

// 子弹类型1
class Bullet1 extends BulletBase {
  constructor (...args) {
    super(...args)
    this.image = this.gameObj.images.bullet1
    // 子弹宽高
    this.w = 9
    this.h = 21
    // 子弹杀伤力
    this.power = 1.5
  }
}

// 子弹类型2
class Bullet2 extends BulletBase {
  constructor (...args) {
    super(...args)
    this.image = this.gameObj.images.bullet2
    // 子弹宽高
    this.w = 9
    this.h = 21
    // 子弹杀伤力
    this.power = 2
  }
}

// 子弹类型3
class Bomb extends BulletBase {
  constructor (...args) {
    super(...args)
    this.image = this.gameObj.images.bomb
    // 子弹宽高
    this.w = 63
    this.h = 53
    // 子弹速度
    this.speed = 5
    // 子弹杀伤力
    this.power = 20
  }
}

export default BulletManager
