export default class Plane extends Phaser.GameObjects.Group {
  route = this.createRoute()
  area = this.createArea()
  constructor(...params: ConstructorParameters<typeof Phaser.GameObjects.Group>) {
    super(...params)
    this.scene.add.existing(this)
    // const graphics = this.scene.add.graphics().fillStyle(0xffffff)
    // const rect = this.createRect()
    // const mask = this.createMask()
    // const { width, height } = this.scene.cameras.main
    //@ts-ignore
    // const shape = this.scene.make.graphics()
    // shape.fillStyle(0xffffff)
    // const route = this.createRoute()
    // route.lineTo(width, height)
    // route.lineTo(0, height)
    // route.closePath()
    // // shape.lineStyle(10, 0xff0000)
    // shape.fillPoints(route.getSpacedPoints(256))
    // route.draw(shape)
    // const mask = shape.createGeometryMask()
    // rect.setMask(mask)

    const shape = this.scene.add.graphics()
    shape.lineStyle(10, 0xff0000, 1)
    shape.fillStyle(0xfff000)
    shape.arc(400, 300, 100, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(90))
    shape.strokePath()
    shape.lineTo(500, 400)
    shape.lineTo(500, 300)
    shape.fillPath()

    this.scene.make.sprite({})
  }

  createRect() {
    const graphics = this.scene.add.graphics()
    graphics.fillGradientStyle(0xfff000, 0xfff000, 0xff0000, 0xff0000, 1, 1, 0, 0)
    graphics.fillRect(0, 0, 1280, 720)
    return graphics
  }

  createMask() {
    //@ts-ignore
    const shape = this.scene.make.graphics()
    shape.fillStyle(0xfffff0)
    const route = this.createRoute()
    route.lineTo(800, 600)
    route.lineTo(0, 600)
    shape.lineStyle(10, 0xff0000)
    route.draw(shape, 128)
    shape.fillPath()
    shape.stroke()
    return shape.createGeometryMask()
  }

  getCircelPosition(x1: number, y1: number, x2: number, y2: number) {
    // 求圆的半径和圆心
    // const r = (b²+h²/2h
    const r = ((y1 * y1 + x2 * x2) / 2) * y1
    console.log(r)
  }
  createArea() {
    const path = this.createRoute()
    //@ts-ignore
    const { width, height, x, y } = path.getBounds()

    path.lineTo(x + width, y)
    path.lineTo(x + width, y + height)
    path.closePath()

    return path
  }
  createRoute() {
    const rate = 772 / 360
    const { width, height } = this.scene.cameras.main
    const padding = 20
    // 二次贝塞尔曲线
    var path = new Phaser.Curves.Path()
    const h = height - padding
    const w = width - padding
    var points = [padding, h, w, h, w, h - w / rate]
    //@ts-ignore
    var curve = new Phaser.Curves.QuadraticBezier(points)

    path.add(curve)
    return path
  }
  /**
   * 在圆上截取一段弧并转化为三次贝塞尔曲
   * 给定弧的起点和终点（分别为 [x1, y1] 和 [x4, y4]）和圆的中心（[xc, yc]）
   */
  getBezierFromCircle(x1: number, y1: number, x4: number, y4: number, xc: number, yc: number) {
    const ax = x1 - xc
    const ay = y1 - yc
    const bx = x4 - xc
    const by = y4 - yc
    const q1 = ax * ax + ay * ay
    const q2 = q1 + ax * bx + ay * by
    const k2 = ((4 / 3) * (Math.sqrt(2 * q1 * q2) - q2)) / (ax * by - ay * bx)

    const x2 = xc + ax - k2 * ay
    const y2 = yc + ay + k2 * ax
    const x3 = xc + bx + k2 * by
    const y3 = yc + by - k2 * bx

    var startPoint = new Phaser.Math.Vector2(x1, y1)
    var controlPoint1 = new Phaser.Math.Vector2(x2, y2)
    var controlPoint2 = new Phaser.Math.Vector2(x3, y3)
    var endPoint = new Phaser.Math.Vector2(x4, y4)

    const path = new Phaser.Curves.Path()
    const curve = new Phaser.Curves.CubicBezier(startPoint, controlPoint1, controlPoint2, endPoint)
    path.add(curve)
    return curve
  }
  /**
   *
   * @param cx 圆心x坐标
   * @param cy 圆心y坐标
   * @param radius 圆半径
   * @param fromAngle 开始角度
   * @param toAngle 结束角度
   * @param anticlockwise 是否逆向 默认false
   * @returns 贝塞尔曲线 路径对象
   */
  getBezierFromCircle2(
    cx: number,
    cy: number,
    radius: number,
    fromAngle: number,
    toAngle: number,
    anticlockwise?: boolean
  ) {
    const dir = anticlockwise ? -1 : 1
    const x1 = cx + radius * Math.cos(fromAngle * dir)
    const y1 = cy + radius * Math.sin(fromAngle * dir)
    const x2 = cx + radius * Math.cos(toAngle * dir)
    const y2 = cy + radius * Math.sin(toAngle * dir)

    return this.getBezierFromCircle(x1, y1, x2, y2, cx, cy)
  }

  xor() {
    const graphics2 = this.scene.add.graphics()

    graphics2.fillStyle(0xfff000)
    graphics2.lineStyle(10, 0xff0000)
    const r = 2000 / 2
    graphics2.fillCircle(0, (r - 360) * -1, r).stroke()
    const graphics = this.scene.add.graphics()
    graphics.fillGradientStyle(0x8c3daa, 0x8c3daa, 0x293778, 0x293778, 1, 1, 0, 0)
    graphics.fillRect(0, 0, 772, 360)
    const modes = [
      Phaser.BlendModes.ADD,
      Phaser.BlendModes.COLOR,
      Phaser.BlendModes.COLOR_BURN,
      Phaser.BlendModes.COLOR_DODGE,
      Phaser.BlendModes.COPY,
      Phaser.BlendModes.DARKEN,
      Phaser.BlendModes.DESTINATION_ATOP,
      Phaser.BlendModes.DESTINATION_IN,
      Phaser.BlendModes.DESTINATION_OUT,
      Phaser.BlendModes.DESTINATION_OVER,
      Phaser.BlendModes.DIFFERENCE,
      Phaser.BlendModes.ERASE,
      Phaser.BlendModes.EXCLUSION,
      Phaser.BlendModes.HARD_LIGHT,
      Phaser.BlendModes.HUE,
      Phaser.BlendModes.LIGHTEN,
      Phaser.BlendModes.LIGHTER,
      Phaser.BlendModes.LUMINOSITY,
      Phaser.BlendModes.MULTIPLY,
      Phaser.BlendModes.NORMAL,
      Phaser.BlendModes.OVERLAY,
      Phaser.BlendModes.SATURATION,
      Phaser.BlendModes.SCREEN,
      Phaser.BlendModes.SKIP_CHECK,
      Phaser.BlendModes.SOFT_LIGHT,
      Phaser.BlendModes.SOURCE_ATOP,
      Phaser.BlendModes.SOURCE_IN,
      Phaser.BlendModes.SOURCE_OUT,
      Phaser.BlendModes.XOR
    ]
    modes.forEach((item, index) => {
      setTimeout(() => {
        console.log(item)
        graphics.setBlendMode(item)
      }, 1000 * index)
    })
  }
}
