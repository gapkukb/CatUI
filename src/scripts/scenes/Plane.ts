export default class Plane extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, x?: number, y?: number, children?: Phaser.GameObjects.GameObject[]) {
    super(scene, x, y, children)
    const txt1 = scene.add.text(300, 100, '阿西吧1', { color: 'red' })
    const txt2 = scene.add.text(300, 200, '阿西吧2', { color: 'red' })
    const txt3 = scene.add.text(300, 300, '阿西吧3', { color: 'red' })
    this.add(txt1)
    this.add(txt2)
    this.add(txt3)

    scene.add.existing(this)
    return this
  }

  private createBackground() {
    const shape = this.scene.add.graphics({})
    const scolor = 0x8c3daa
    const ecolor = 0x2a3877
    shape.fillGradientStyle(scolor, scolor, ecolor, ecolor, 1, 1, 0, 0)
    shape.fillRect(0, 0, this.width, this.height)
    shape.setMask(this.createMask())
    return shape
  }
  private getPath(addToScene?: boolean) {
    const radius = this.width * 1.36
    const cx = this.x
    const cy = this.y - radius + this.height
    const shape = this.scene.make.graphics({}, addToScene)
    shape.arc(cx, cy, radius, Phaser.Math.DegToRad(43), Phaser.Math.DegToRad(90))
    return shape
  }
  private createMask() {
    const shape = this.getPath()
    shape.lineTo(this.x + this.width, this.y + this.height)
    shape.lineTo(this.x + this.width, this.y)
    shape.closePath()
    shape.fillStyle(0xffffff)
    shape.fill()
    return shape.createGeometryMask()
  }

  createPath() {
    const radius = this.width * 1.36
    const cx = this.x
    const cy = this.y - radius + this.height
    const lineWidth = 10

    const path = this.scene.make.graphics({})
    path.lineStyle(lineWidth, 0xffffff)
    path.arc(cx, cy, radius, Phaser.Math.DegToRad(43), Phaser.Math.DegToRad(90))
    path.stroke()
    const mask = path.createGeometryMask()

    const shape = this.scene.add.graphics()
    const scolor = 0x2a3877
    const ecolor = 0x8c3daa
    shape.fillGradientStyle(scolor, ecolor, scolor, ecolor)
    shape.fillRect(this.x, this.y, this.width, this.height + lineWidth)
    shape.setMask(mask)

    return shape
  }
}
