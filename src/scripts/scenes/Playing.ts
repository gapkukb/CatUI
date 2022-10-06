import { gameChannel } from '../../socket'
import PhaserLogo from '../objects/phaserLogo'
import Rocket from '../objects/Rocket'
import Axes from './Axes'
let container: Phaser.GameObjects.Container
export default class Playing extends Phaser.Scene {
  rocket: Rocket
  constructor() {
    super(Playing.name)
  }
  private createPath(style: Phaser.Types.GameObjects.Graphics.Options) {
    const path = this.make.graphics(style)
    const r = (this.scale.height * this.scale.height + this.scale.width * this.scale.width) / (2 * this.scale.height)
    const y = r - this.scale.height
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
    const rect = this.add.graphics()
    rect.fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 1, 1, 1, 1)
    rect.fillRect(0, 0, this.scale.width, this.scale.height)
    rect.setMask(mask)
    return rect
  }
  createShadow() {
    const path = this.createPath({
      fillStyle: {
        color: 0xfffff0
      }
    })
    path.lineTo(this.scale.width, this.scale.height)
    path.lineTo(this.scale.width, 0)
    path.fill()
    const mask = path.createGeometryMask()
    const rect = this.add.graphics()
    rect.fillGradientStyle(0xf00000, 0xf00000, 0xfffff0, 0xfffff0, 1, 1, 0, 0)
    rect.fillRect(0, 0, this.scale.width, this.scale.height)
    rect.setMask(mask)
    return rect
  }
  init() {
    this.rocket = new Rocket(this)
    console.log(this.scene.get(Axes.name))
    gameChannel.add(data => {
      console.log(data)
    })
  }

  create() {
    console.log(this.rocket.width)
  }

  update(time: number, delta: number): void {
    // this.cameras.main.scrollY += 0.1
  }
}
