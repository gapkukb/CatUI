class WorldPostion {
  constructor(private parent: Viewport) {}
  get x() {
    return this.parent.x
  }
  get y() {
    return this.parent.y
  }
}

export default class Viewport extends Phaser.GameObjects.Container {
  static Align = Phaser.Display.Align.To
  parent: Viewport | null
  SORT_ASC = -1
  SORT_DES = 1
  worldPostion = new WorldPostion(this)

  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y)
    scene.add.existing(this)
  }

  get children() {
    return this.list
  }

  get size() {
    const bounds = this.getBounds()
    return {
      width: bounds.width - this.x,
      height: bounds.height - this.y
    }
  }
  setOrigin(x = 0, y = 0) {
    Phaser.Actions.SetOrigin(this.list, x, y)
  }

  pullBottom(node: Viewport, child: Phaser.GameObjects.GameObject) {
    const bound = node.getBounds()
    const centerX = node.x + bound.width / 2

    child.x = centerX - child.width * 0.5
  }
}
