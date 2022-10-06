/**
 * 二维坐标类
 */
export default class Axes extends Phaser.Scene {
  running = false
  axisXLength = 10
  axisYLength = 12
  axisX: Phaser.GameObjects.Text[] = []
  axisY: Phaser.GameObjects.Text[] = []
  style: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#000000'
  }
  constructor() {
    super(Axes.name)
  }
  createAxisX() {
    const {
      style,
      scale: { width, height },
      axisXLength: len
    } = this

    const ary = Array(len)
      .fill(0)
      .map(() => this.add.text(0, height - 20, '', style))
    //phaser actions 批处理
    this.axisX = Phaser.Actions.Spread(ary, 'x', 0, width)
  }
  createAxisY() {
    const {
      style,
      scale: { height },
      axisYLength: len
    } = this
    const ary = Array(len)
      .fill(0)
      .map(() => this.add.text(0, 0, '', style))
    //phaser actions 批处理
    this.axisY = Phaser.Actions.Spread(ary, 'y', 20, height - 20).reverse()
  }

  updateAxisX(currentTime: number) {
    const { axisXLength: len, axisX: axis } = this
    if (currentTime < len) return
    const avg = currentTime / len
    for (let i = 0; i < len; i++) {
      let text = (avg * (i + 1)).toFixed(1) + 's'
      axis[i].setText(text)
    }
  }

  updateAxisY(currentHeight: number) {
    const { axisY: axis, axisYLength: len } = this
    if (currentHeight < len) return
    const avg = currentHeight / len
    for (let i = 0; i < len; i++) {
      let text = (avg * (i + 1)).toFixed(1) + 'x'
      axis[i].setText(text)
    }
  }

  reset() {
    this.running = false
    this.createAxisX()
    this.createAxisY()
  }

  init() {
    this.reset()
  }

  preload() {
    console.log('Axes preload')
    //加载loadingbar需要的资源
    // this.load.image('')
  }
  create() {
    this.updateAxisX(this.axisXLength)
    this.updateAxisY(this.axisYLength)
  }
  update(time: number, delta: number): void {
    if (!this.running) return
    this.updateAxisX(time / 1000)
    this.updateAxisY(time / 1000)
  }
}
