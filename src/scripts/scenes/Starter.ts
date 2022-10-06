import Playing from './Playing'

/**
 * 游戏加载类
 */
export default class Starter extends Phaser.Scene {
  constructor() {
    super(Starter.name)
  }
  private countdown() {
    const text = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, '', {
      fontSize: '100px',
      color: '0xff0000'
    })

    const timer = this.time.addEvent({
      repeat: 5,
      delay: 1000,
      startAt: 1000,
      paused: true,
      callback: () => {
        const cur = timer.repeatCount
        text.setText(cur + 'S')
        if (cur === 0) {
          this.scene.start(Playing.name)
        }
      }
    })

    return timer
  }
  init() {
    console.log('Starter init')
  }
  preload() {
    console.log('Starter preload')
  }
  create() {
    this.scene.start(Playing.name)
    return

    // console.log('Starter create')
    // const feiji = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'feiji')
    // this.anims.create({
    //   key: 'fire',
    //   repeat: -1,
    //   frameRate: 10,
    //   frames: this.anims.generateFrameNames('feiji', {
    //     start: 3,
    //     end: 5
    //   })
    // })
    // feiji.anims.play('fire')
    // const timer = this.countdown()
    // timer.paused = false
  }
  update() {
    console.log('Starter update')
  }
}
