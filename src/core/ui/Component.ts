import getScene from './utils/getScene'

export default class Component {
  scene: null | Phaser.Scene
  #shutdown = false

  constructor(public parent: any, config?: any) {
    this.scene = getScene(parent)

    Phaser.Utils.Objects.GetValue(config, 'eventEmitter', true)

    if (this.parent && this.parent === this.scene) {
      // this.scene?.sys.events.once('shutdown', this.)
    }
  }

  shutdown(scene: Phaser.Scene): void {}
  destory(scene) {
    this.shutdown(scene)
  }
  onParentDestory(parent: any, scene: Phaser.Scene) {
    this.destory(scene)
  }
  onSceneDestory() {
    this.destory(true)
  }
}
