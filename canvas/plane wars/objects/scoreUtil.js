/*
 * @Author: zu1662
 * @LastEditor: zu1662
 * @Date: 2019-08-03 17:21:36
 * @LastEditTime: 2019-08-03 17:29:40
 * @Description:  分数管理类
 */

 class ScoreUtil {
   constructor () {
     // 当前分数
     this.score = 0
     // 获取最高分数
     this.maxScore = this.getMaxScore()
   }

   // 增加分数
   addScore(score) {
     this.score  = this.score + score 
   }

   // 获取最高分数
   getMaxScore () {
    return localStorage.getItem('palneWar_maxScore')
   }

   // 最高分数保存到本地
   setMaxScore () {
     if (this.score > this.maxScore) {
       localStorage.setItem('palneWar_maxScore', this.score)
     }
   }
 }
