class Food {
  constructor ({gameObj}) {
    this.gameObj = gameObj
    this.cell = this.gameObj.cell
    this.x = 0
    this.y = 0

    this.createNewFood()
  }

  render () {
    this.gameObj.ctx.fillStyle = '#999'
    this.gameObj.ctx.fillRect(this.x, this.y, this.cell, this.cell)
  }

  createNewFood () {
    let rowNum = Math.ceil(this.gameObj.clientWidth / this.cell)
    let colNum = Math.ceil(this.gameObj.clientHeight / this.cell)
    this.x = Math.floor(Math.random() * (rowNum - 10) + 5) * this.cell
    this.y = Math.floor(Math.random() * (colNum - 10) + 5) * this.cell
  }
}

export default Food