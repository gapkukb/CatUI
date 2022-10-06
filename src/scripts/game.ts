import 'phaser'
import Boot from './scenes/Boot'
import Preload from './scenes/Preload'
import Menu from './scenes/Menu'
import Starter from './scenes/Starter'
import Playing from './scenes/Playing'
import Axes from './scenes/Axes'
import Demo from './scenes/Demo'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  //   backgroundColor: '#ffffff',
  backgroundColor: 0x555555,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  //   scene: [Boot, Preload, Menu, Axes, Starter, Playing],
  scene: Demo,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 400 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
