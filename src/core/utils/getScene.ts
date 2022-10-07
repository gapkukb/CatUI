function isScene(object: any) {
  return object instanceof Phaser.Scene
}
function panic(): never {
  const errmsg = '参数必须是对象且必须是场景或者包含场景属性的对象'
  throw new Error(errmsg)
}
export default function getScene(object: any): Phaser.Scene {
  if (!(object instanceof Object)) panic()
  if (isScene(object)) return object
  if (isScene(object.scene)) return object.scene
  if (!object.parent) return panic()
  if (isScene(object.parent)) return object.parent
  if (isScene(object.parent.scene)) return object.parent.scene
  panic()
}
