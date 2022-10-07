class WorldPostion {
  constructor(private parent: Viewport) {}
  get x() {
    return this.parent.x
  }
  get y() {
    return this.parent.y
  }
}

export default class Viewport extends Phaser.GameObjects.Container {}
