import isGame from './is-game'
import isPlainObject from './is-plain-object'
import isScene from './is-scene'
import panic from './panic'

export default function getGame(object: any): Phaser.Game {
  const msg = '请传入游戏对象或者场景对象或者游戏组件对象'
  if (!isPlainObject(object)) return panic(msg)
  if (isGame(object)) return object as any
  if (isGame(object.game)) return object as any
  if (isScene(object)) return object.sys.game
  if (isScene(object.scene)) return object.scene.sys.game
  panic(msg)
}
