/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 17:21:36
 * @LastEditTime: 2019-08-04 21:02:08
 * @Description:  分数管理类
 */

class ScoreUtil {
  constructor({ gameObj }) {
    // 游戏对象
    this.gameObj = gameObj

    // 当前分数
    this.score = 0
    // 获取最高分数
    this.maxScore = this.getMaxScore()
  }

  // 把分数刻画在屏幕
  render() {
    this.gameObj.ctx.font = "20px 黑体"
    this.gameObj.ctx.fillText("分数 " + this.score, this.gameObj.canvas.width - 150, 20);
  }

  // 增加分数
  addScore(score) {
    this.score = this.score + score
  }

  // 获取最高分数
  getMaxScore() {
    return localStorage.getItem('palneWar_maxScore') || 0
  }

  // 最高分数保存到本地
  setMaxScore() {
    if (this.score > this.maxScore) {
      localStorage.setItem('palneWar_maxScore', this.score)
    }
  }
}

export default ScoreUtil
