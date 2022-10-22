class Cat {
  constructor ({gameObj, name = 'A', color = 'red' }) {
    this.gameObj = gameObj
    this.name = name
    this.color = color
    this.cell = this.gameObj.cell
    this.rowI = 0
    this.colI = 0
    this.setEffect = false
    
    this.dir = 'right'

    this.createNewCat()
  }

  update () {
    let nextRowI = this.rowI
    let nextColI = this.colI
    let oneStepRowI = this.rowI
    let oneStepColI = this.colI
    switch(this.dir) {
      case 'right':
        nextColI = this.colI + (this.setEffect ? 2 : 1)
        oneStepColI = this.colI + 1
        break
      case 'left':
        nextColI = this.colI - (this.setEffect ? 2 : 1)
        oneStepColI = this.colI - 1
        break
      case 'top':
        nextRowI = this.rowI - (this.setEffect ? 2 : 1)
        oneStepRowI = this.rowI - 1
        break
      case 'bottom':
        nextRowI = this.rowI + (this.setEffect ? 2 : 1)
        oneStepRowI = this.rowI + 1
        break
    }
    // 超出边界，重新设定方向
    if(nextRowI > this.gameObj.row - 1 || nextRowI < 0 || nextColI > this.gameObj.col - 1 || nextColI < 0)  {
      this.dir = this._getNextDir()
      this.update()
      return
    }

    // 两格的位置，需要判断 + 1 的情况，防止穿墙
    if(this.setEffect) {
      const oneStepItem = this.gameObj.mazeArr[oneStepRowI][oneStepColI]
      if(!oneStepItem.type) {
        this.dir = this._getNextDir()
        this.update()
        return
      }
    }
    // 判断下个位置是否符合要求
    const nextItem = this.gameObj.mazeArr[nextRowI][nextColI]
    if(!nextItem.type) {
      this.dir = this._getNextDir()
      this.update()
    } else {
      this.gameObj.mazeArr[this.rowI][this.colI].hasCat = false
      this.rowI = nextRowI
      this.colI = nextColI
      this._setCatPosition()
      // 如果存在加速特效，设置加速，并清除特效值为false
      if(nextItem.hasEffect) {
        this.setEffect = true
        nextItem.hasEffect = false
      }
      this._checkCat()
      nextItem.hasCat = true
    }
  }

  createNewCat () {
    this.catDom = document.createElement('p')
    this.catDom.classList = 'cat'
    this.catDom.innerText = this.name
    this.catDom.style.backgroundColor = this.color
    const mazeArr = this.gameObj.mazeArr
    const row = this.gameObj.row
    const col = this.gameObj.col
    let flag = true
    while(flag) {
      const rowIndex = Math.floor(Math.random() * row)
      const colIndex = Math.floor(Math.random() * col)
      const arrItem = mazeArr[rowIndex][colIndex]
      if(arrItem.type && !arrItem.hasCat && !arrItem.hasEffect) {
        flag = false
        this.rowI = rowIndex
        this.colI = colIndex
        arrItem.hasCat = true
      }
    }
    this.gameObj.domNode.appendChild(this.catDom)
    this._setCatPosition()
  }

  _checkCat(){
    const leftItem = this.colI - 1 < 0 ? null : this.gameObj.mazeArr[this.rowI][this.colI - 1]
    const rightItem = this.colI + 1 > this.gameObj.col - 1 ? null :  this.gameObj.mazeArr[this.rowI][this.colI + 1]
    const topItem = this.rowI - 1 < 0 ? null : this.gameObj.mazeArr[this.rowI - 1][this.colI]
    const bottomItem = this.rowI + 1 > this.gameObj.row - 1 ? null : this.gameObj.mazeArr[this.rowI + 1][this.colI]
    if((leftItem && leftItem.hasCat) || (rightItem && rightItem.hasCat) || (topItem && topItem.hasCat) || (bottomItem && bottomItem.hasCat)) {
      this.gameObj.gameOver()
    }
  }
  _setCatPosition(){
    // 盒模型，(50 - 40) / 2 为 基础偏移 + (每个盒子 1px border) * index
    this.catDom.style.top = (this.cell + 1) * this.rowI + 5 + 'px'
    this.catDom.style.left = (this.cell + 1) * this.colI + 5 + 'px'
  }

  _getNextDir(){
    const dirArr = ['top', 'left', 'right', 'bottom']
    const dirIndex = Math.floor(Math.random() * dirArr.length)
    return dirArr[dirIndex]
  }
}

export default Cat