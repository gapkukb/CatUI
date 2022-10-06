import Preload from './Preload'
// import PhaserGUIAction from 'phaser3_gui_inspector'
import { gameChannel, connection } from '../../socket'

/**
 * 游戏启动类
 */
export default class Boot extends Phaser.Scene {
  constructor() {
    super(Boot.name)
  }
  init() {
    console.log('Boot init')
  }
  preload() {
    console.log('Boot preload')
    //加载loadingbar需要的资源
    // this.load.image('')
  }
  create() {
    console.log('Boot create')
    // connection.connect().then(() => {
    //   this.scene.start(Preload.name)
    // })
    // new PhaserGUIAction(this)
  }
}
