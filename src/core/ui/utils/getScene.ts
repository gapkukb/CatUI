function isScene(object: any) {
  return object instanceof Phaser.Scene
}

export default function getScene(object: any): null | Phaser.Scene {
  if (!(object instanceof Object)) return null
  if (isScene(object)) return object
  if (isScene(object.scene)) return object.scene
  if (isScene(object.parent?.scene)) return object.parent.scene
  return null
}
