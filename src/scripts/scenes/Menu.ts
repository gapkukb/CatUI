import Preload from './Preload'

/**
 * 游戏启动类
 */
export default class Menu extends Phaser.Scene {
  constructor() {
    super(Menu.name)
  }
  init() {
    console.log('Menu init')
  }
  preload() {
    console.log('Menu preload')
  }
  create() {
    console.log('Menu create')

    this.add
      .text(this.cameras.main.width, 0, 'MENU', {
        fontSize: '24px',
        color: '0xff0000'
        // align: 'right'
      })
      .setOrigin(1, 0)
  }
}
