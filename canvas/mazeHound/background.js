class Background {
  constructor ({gameObj}) {
    this.gameObj = gameObj
    // 每个背景格的大小
    this.cell = this.gameObj.cell
  }

  // 刻画背景的放歌
  renderBG() {
    const mazeArr = this.gameObj.mazeArr
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < mazeArr.length; i++) {
      const rowArr = mazeArr[i];
      const rowFragment = document.createDocumentFragment()
      const rowDiv = document.createElement('div')
      rowDiv.className = 'row-box'
      for (let j = 0; j < rowArr.length; j++) {
        const item = rowArr[j];
        const domItem = document.createElement('i')
        domItem.className = item.type ? 'road' : 'block'
        rowFragment.appendChild(domItem)
      }
      rowDiv.appendChild(rowFragment)
      fragment.appendChild(rowDiv)
    }
    this.gameObj.domNode.appendChild(fragment)
  }
}

export default Background