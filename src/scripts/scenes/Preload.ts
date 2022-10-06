import Axes from './Axes'
import Menu from './Menu'
import Starter from './Starter'

/**
 * 游戏加载类,加载全局资源
 */
export default class Preload extends Phaser.Scene {
  constructor() {
    super(Preload.name)
  }
  init() {}
  preload() {
    this.load.setPath('/assets/img/')
    const loadingBar = new LoadingBar(this, this.cameras.main.width, this.cameras.main.height)
    this.load.on(Phaser.Loader.Events.PROGRESS, loadingBar.onProgress.bind(loadingBar))
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      loadingBar.destroy(true)
    })
    this.load.once(Phaser.Loader.Events.FILE_LOAD_ERROR, (file: Phaser.Loader.File) => {})
    this.load.spritesheet('feiji', undefined, {
      frameWidth: 384 / 6,
      frameHeight: 433 / 2
    })
  }

  create() {
    console.log('Preload create')
    // 延迟一秒进入主场景
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: () => {
    //     // this.scene.get(Axes.name).scene.setActive(true)
    //     // this.scene.get(Menu.name).scene.setActive(true)
    //     this.scene.launch(Axes.name)
    //     this.scene.launch(Menu.name)
    //     this.scene.launch(Starter.name)
    //   }
    // })

    this.scene.launch(Axes.name)
    this.scene.launch(Menu.name)
    this.scene.launch(Starter.name)
    this.scene.remove(Preload.name)
  }
}

class LoadingBar extends Phaser.GameObjects.Container {
  bar: Phaser.GameObjects.Graphics
  text: Phaser.GameObjects.Text
  radius: number

  constructor(scene: Phaser.Scene, x: number, y: number, width: number = 0, height: number = 0) {
    super(scene, x, y)
    this.width = width
    this.height = height

    this.bar = this.scene.add.graphics({
      fillStyle: { color: 0xff0000 },
      lineStyle: { color: 0xfff000, width: 2 }
    })

    this.text = this.scene.add.text(this.width / 2, this.height / 2, '')
  }

  onProgress(progress: number) {
    this.bar.clear()
    this.bar.fillRoundedRect(0, 0, this.width * progress, this.height, this.radius)
    this.bar.strokeRoundedRect(0, 0, this.width, this.height, this.radius)

    this.text.setText(`${progress}%`)
  }
}
