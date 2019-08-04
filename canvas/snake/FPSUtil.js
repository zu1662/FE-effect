/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 15:06:03
 * @LastEditTime: 2019-08-03 17:38:40
 * @Description:  帧数计算类
 */
class FPSUtil {
  /**
   * @description: FPS指每秒的帧数，即在执行 setinterval 时，设置循环的时间应为 1000/FPS 的时间间隔。
   */
  constructor () {
    // 当前的帧序号
    this.currentFrame = 0
    // 起始帧变量
    this.sFrame = 0
    this.sTime = 0
    // 实际帧数
    this.realFPS = 0
  }
  
  // 更新帧数
  update () {
    // 每循环一次，帧数就会 +1
    this.currentFrame ++

    let nowTime = new Date()
    if(nowTime - this.sTime > 1000) { 
      // 计算时间在大于1秒的时候，执行了多少次循环，即为帧数
      this.realFPS = this.currentFrame - this.sFrame
      // 把最后的帧数更新为起始帧数
      this.sFrame = this.currentFrame
      // 把最后的时间更新为起始时间
      this.sTime = nowTime
    }
  }
}

export default FPSUtil
