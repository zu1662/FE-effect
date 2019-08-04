/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-04 14:56:05
 * @LastEditTime: 2019-08-04 21:12:02
 * @Description:  补给类（掉下的飞弹）
 */
class SupplyManager {
  constructor ({gameObj}) {
    // 游戏对象
    this.gameObj = gameObj
    // 补给列表
    this.supplyArr =[]
    // 补给比例数组，bomb补给比较少
    this.supplyTypeArr = [1, 1, 2, 1, 1]
    // 初始化补给生成间隔
    this.sFrame = this.gameObj.fpsUtil.currentFrame
    this.addInterval = Math.random() * 500 + 200 // 500 ~ 1500
  }

  // 当界面内不存在补给时，生成补给
  addSupply () {
    // 控制生成补给的时间
    if (this.gameObj.fpsUtil.currentFrame - this.sFrame <= this.addInterval) return
    this.sFrame  = this.gameObj.fpsUtil.currentFrame
    this.addInterval = Math.random() * 500 + 200

    // 随机生成补给类型
    const supplyTypeIdx = Math.ceil(Math.random() * 4)
    const supplyType = this.supplyTypeArr[supplyTypeIdx]
    // 补给初始化
    let supply
    if (supplyType === 1) {
      supply = new SupplyBase({
        gameObj: this.gameObj
      })
    } else {
      supply = new SupplyBomb({
        gameObj: this.gameObj
      })
    }
    if (this.supplyArr.length === 0) {
      this.supplyArr.push(supply)
    }
  }

  // 更新补给位置
  updateSupply () {
    this.supplyArr.forEach((item, idx) => {
      // 超出界限则删除
      if (item.y > this.gameObj.canvas.height) {
        this.supplyArr.splice(idx, 1)
      }

      item.update()
      item.render()
    })
  }

  clearSupply (supply) {
    this.supplyArr.splice(this.supplyArr.indexOf(supply), 1)
  }
}

// 补给类型1
class SupplyBase {
  constructor ({gameObj}) {
    // 游戏对象
    this.gameObj = gameObj
    // 补给图片
    this.image = this.gameObj.images.prop1
    // 补给图片宽高
    this.w = 58
    this.h = 88
    // 补给起始位置
    this.y = -50
    this.x = Math.random() * (this.gameObj.canvas.width - this.w / 2)
    // 补给数量
    this.num = 60
    // 补给降落速度
    this.speed = Math.random() * 3 + 1 // 1 ~ 4
    // 补给类型
    this.supplyType = 1
  }

  update () {
    this.y = this.y + this.speed
    // 判断是否跟飞机碰撞，碰撞则更新飞机状态
    const planeX = this.gameObj.plane.x
    const planeY = this.gameObj.plane.y
    const planeW = this.gameObj.plane.w
    const planeH = this.gameObj.plane.h
    if (
      this.x > planeX - this.w &&
      this.x < planeX + planeW + this.w &&
      this.y > planeY - this.h &&
      this.y < planeY + planeH + this.h
    ) {
      this.gameObj.plane.getSupply(this.supplyType, this.num)
      this.gameObj.supplyManager.clearSupply(this)
    }
  }
  render () {
    this.gameObj.ctx.drawImage(this.image, this.x, this.y, this.w, this.h)
  }
}

class SupplyBomb extends SupplyBase {
  constructor (...args) {
    super(...args)
    this.image = this.gameObj.images.prop2
    // 补给图片宽高
    this.w = 60
    this.h = 103
    // 补给数量
    this.num = 10
    // 补给类型
    this.supplyType = 2
  }
}

export default SupplyManager