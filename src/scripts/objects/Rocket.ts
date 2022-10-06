export default class Rocket extends Phaser.GameObjects.Container {
  width = this.scene.scale.width
  height = this.scene.scale.height
  constructor(scene: Phaser.Scene) {
    super(scene)
    scene.add.existing(this)
    // const shadow = this.createShadow()
    // const route = this.createRoute()
    // this.add(shadow).add(route)

    // const shape = this.scene.add.graphics()
    // shape.fillGradientStyle(0xf00000, 0xf00000, 0xfffff0, 0xfffff0, 1, 1, 0, 0)
    // shape.fillRect(0, 0, this.width, this.height)

    this.circle()
  }
  private createPath(style: Phaser.Types.GameObjects.Graphics.Options) {
    const path = this.scene.make.graphics(style)
    const r = (this.height * this.height + this.width * this.width) / (2 * this.height)
    const y = r - this.height
    path.arc(0, -y, r, 0, (90 / 180) * Math.PI)
    return path
  }
  createRoute() {
    const path = this.createPath({
      lineStyle: {
        width: 10,
        color: 0xffffff
      }
    })
    path.stroke()
    const mask = path.createGeometryMask()
    const rect = this.scene.add.graphics()
    rect.fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 1, 1, 1, 1)
    rect.fillRect(0, 0, this.width, this.height)
    // rect.setMask(mask)
    return rect
  }
  createShadow() {
    const path = this.createPath({
      fillStyle: {
        color: 0xfffff0
      }
    })
    path.lineTo(this.width, this.height)
    path.lineTo(this.width, 0)
    path.fill()
    const mask = path.createGeometryMask()
    const rect = this.scene.add.graphics()
    rect.fillGradientStyle(0xf00000, 0xf00000, 0xfffff0, 0xfffff0, 1, 1, 0, 0)
    rect.fillRect(0, 0, this.width, this.height)
    // rect.setMask(mask)
    return rect
  }
  createMask() {
    const rect = this.scene.add.graphics()
    rect.fillStyle(0xffffff)
    rect.fillRect(0, 0, this.width, this.height)
    return rect.createGeometryMask()
  }

  circle() {
    const posX = 100
    const posY = 100

    const size = 600
    const gradient1 = 0xff0000
    const gradient2 = 0xffff00
    // 创建两个纹理，从第一个纹理中擦除一个圆形，得到四个边角，再从第二个纹理中擦除第一个纹理中的四个边角，得到中间的圆形。
    //create graphic: a large rectangle
    let rectangle = this.scene.add.graphics()
    rectangle.setVisible(false)
    rectangle.fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 1)
    rectangle.fillRect(0, 0, size, size)

    let rt1 = this.scene.add.renderTexture(0, 0, size, size)
    let rt2 = this.scene.add.renderTexture(0, 0, size, size)

    rt1.draw(rectangle)
    rt2.draw(rectangle, 500, 1000)

    let eraser = this.scene.add.circle(0, 0, size / 2, 0x000000)
    eraser.setVisible(false)

    // //erase the circle from the first rect 擦掉第一个矩形上的圆
    // rt1.erase(eraser, size / 2, size / 2)

    // //erase the rect with the cutout from the second rect, creating the circle with gradient
    // rt2.erase(rt1, 0, 0)

    // //the center of the renderTexture has offset of (size / 2)
    // rt2.x = posX - size / 2
    // rt2.y = posY - size / 2

    // //save the rendertexture with a key
    // rt2.saveTexture('gradientCircle1')
    // this.scene.add.image(posX, posY, 'gradientCircle1').setOrigin(0.5).setScale(1)

    // rt2.destroy()
    // rt1.destroy()
    // eraser.destroy()
    // rectangle.destroy()
  }
}
