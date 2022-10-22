class Effect {
  constructor ({gameObj }) {
    this.gameObj = gameObj
    this.cell = this.gameObj.cell
    this.rowI = 0
    this.colI = 0
    
    this.createNewEffect()
  }

  update () {
    const item = this.gameObj.mazeArr[this.rowI][this.colI]
    if(!item.hasEffect && this.EffectDom) {
      this.gameObj.domNode.removeChild(this.EffectDom)
      this.EffectDom = null
    }
  }

  createNewEffect () {
    this.EffectDom = document.createElement('p')
    this.EffectDom.classList = 'effect'
    this.EffectDom.innerText = '?'
    this.EffectDom.style.backgroundColor = 'orange'
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
        arrItem.hasEffect = true
      }
    }
    this.gameObj.domNode.appendChild(this.EffectDom)
    this._setEffectPosition()
  }

  _setEffectPosition(){
    // 盒模型，(50 - 40) / 2 为 基础偏移 + (每个盒子 1px border) * index
    this.EffectDom.style.top = (this.cell + 1) * this.rowI + 5 + 'px'
    this.EffectDom.style.left = (this.cell + 1) * this.colI + 5 + 'px'
  }
}

export default Effect