/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-04 18:00:42
 * @LastEditTime: 2019-08-04 21:11:43
 * @Description:  敌机类
 */
class EnemyManager {
  constructor ({ gameObj }) {
    // 游戏对象
    this.gameObj = gameObj
    // 敌机数组
    this.enemyArr = []
    // 敌机生成比例
    this.enemyTypeArr = [1, 1, 1, 1, 1, 2, 2, 2, 3]
    
    // 初始化补给生成间隔
    this.sFrame = this.gameObj.fpsUtil.currentFrame
    this.addInterval = Math.random() * 150 + 50 // 50 ~ 200
  }

  // 添加敌机
  addEnemy () {
    // 控制生成敌机的时间
    if (this.gameObj.fpsUtil.currentFrame - this.sFrame <= this.addInterval) return
    this.sFrame  = this.gameObj.fpsUtil.currentFrame
    this.addInterval = Math.random() *  150 + 50

    // 随机生成补给类型
    const enemyTypIdx = Math.ceil(Math.random() * 9)
    const enemyTyp = this.enemyTypeArr[enemyTypIdx]
    // 补给初始化
    let enemy
    if (enemyTyp === 1) {
      enemy = new EnemyBase({
        gameObj: this.gameObj
      })
    } else if (enemyTyp === 2) {
      enemy = new Enemy1({
        gameObj: this.gameObj
      })
    } else {
      enemy = new Enemy2({
        gameObj: this.gameObj
      })
    }

    this.enemyArr.push(enemy)
    
  }

  // 更新敌机位置
  updateEnemy () {
    this.enemyArr.forEach((item, idx) => {
      // 超出界限则删除
      if (item.y > this.gameObj.canvas.height) {
        this.enemyArr.splice(idx, 1)
        return true
      }

      if (item.liveState) {
        item.update()
      }
      item.render()
    })
  }
  // 删除敌机
  clearEnemy (enemy) {
    this.enemyArr.splice(this.enemyArr.indexOf(enemy), 1)
  }
}

class EnemyBase {
  constructor({ gameObj }) {
    // 游戏对象
    this.gameObj = gameObj

    // 敌机生存状态
    this.liveState = true
    
    // 敌机图片
    this.image = this.gameObj.images.enemy00
    this.dieImageArr = [
      this.gameObj.images.enemy01,
      this.gameObj.images.enemy02,
      this.gameObj.images.enemy03,
      this.gameObj.images.enemy04
    ]
    this.dieFrame = 0

    // 敌机血量
    this.hp = 1

    // 分数
    this.score = 10

    // 敌机大小
    this.w = 51
    this.h = 39

    // 敌机位置
    this.x = Math.random() * (this.gameObj.canvas.width - this.w)
    this.y = -50

    // 速度
    this.speed = Math.random() * 5 + 3
  }

  // 更新位置
  update() {
    this.y = this.y + this.speed
  }

  render() {
    // 敌机死亡动画
    if (!this.liveState) {
      this.dieFrame ++
      let dieImageIdx = Math.floor(this.dieFrame / 10)
      this.image = this.dieImageArr[dieImageIdx]
      if (this.dieFrame >= 40) {
        this.gameObj.enemyManager.clearEnemy(this)
        return
      }
    }

    this.gameObj.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}

class Enemy1 extends EnemyBase {
  constructor (...args) {
    super(...args)
    // 敌机图片
    this.image = this.gameObj.images.enemy10
    this.dieImageArr = [
      this.gameObj.images.enemy11,
      this.gameObj.images.enemy12,
      this.gameObj.images.enemy13,
      this.gameObj.images.enemy14
    ]
    this.hp = 10
    this.w = 69
    this.h = 89
    this.y = -90
    this.score = 50
    this.speed = Math.random() * 3 + 1
  }
}
class Enemy2 extends EnemyBase {
  constructor (...args) {
    super(...args)
    // 敌机图片
    this.image = this.gameObj.images.enemy20
    this.dieImageArr = [
      this.gameObj.images.enemy21,
      this.gameObj.images.enemy22,
      this.gameObj.images.enemy23,
      this.gameObj.images.enemy24
    ]
    this.hp = 30
    this.w = 165
    this.h = 246
    this.y = -250
    this.score = 100
    this.speed = Math.random() * 1 + 0.5
  }
}


export default EnemyManager