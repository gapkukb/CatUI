import getScene from './utils/getScene'

export type TParent = Phaser.GameObjects.GameObject | Phaser.Scene

export abstract class Component extends Phaser.GameObjects.GameObject {
  constructor(parent: TParent, name: string) {
    const scene = getScene(parent)
    super(scene, name)
    this.parent = parent
    console.log(this.shutdown)
  }
  protected _enable = true
  parent: TParent
  isShutdown = false

  get enable() {
    return this._enable
  }

  set enable(e: boolean) {
    if (this._enable === e) return
    this._enable = e
  }

  setEnable(e: boolean = true) {
    this.enable = e
    return this
  }
  toggleEnable() {
    return this.setEnable(!this._enable)
  }
}
