const GetValue = Phaser.Utils.Objects.GetValue
const BetweenPoints = Phaser.Math.Angle.BetweenPoints
const DistanceBetween = Phaser.Math.Distance.Between
const RotateAroundDistance = Phaser.Math.RotateAroundDistance
const Clamp = Phaser.Math.Clamp
const Linear = Phaser.Math.Linear
const Percent = Phaser.Math.Percent
const FromPercent = Phaser.Math.FromPercent

export interface SliderProps {
  enable: boolean
  value: number
  max: number
  min: number
  step: number
  animate: { duration?: number; ease?: string }
  points: [Vector2Like, Vector2Like]
}

type Vector2Like = Required<Phaser.Types.Math.Vector2Like>
export default class Slider extends Phaser.Events.EventEmitter {
  private _enable = false
  private _value = 0
  private _animatable = false
  max = 1
  min = 0
  step = 0.01
  orientation?: 'x' | 'y' | undefined
  scene: Phaser.Scene
  axisRotation: number = 0
  tween: Phaser.Tweens.Tween
  animate: SliderProps['animate'] | false
  /**
   *
   * @param thumb 滑块对象
   * @param startPoint 开始点(最小点)
   * @param endPoint 结束点(最大点)
   * @param config
   */
  constructor(
    public thumb: Phaser.GameObjects.Sprite,
    public startPoint: Vector2Like,
    public endPoint: Vector2Like,
    config?: Partial<SliderProps>
  ) {
    super()
    thumb.setInteractive()
    Object.assign(this, config)
    this.setEndPoints(startPoint, endPoint)
    this.boot()
  }
  get precision() {
    const decimal = this.step.toString().split('.')[1]
    return decimal ? Math.pow(10, decimal.length) : 1
  }
  get isDragaing() {
    return this.thumb.input.dragState > 0
  }

  get enable() {
    return this._enable
  }

  set enable(e: boolean) {
    if (this._enable === e) return
    this._enable = e
    this.thumb.scene.input.setDraggable(this.thumb, e)
  }

  get value() {
    return this._value
  }

  set value(newValue: number) {
    newValue = Clamp(newValue, this.min, this.max)
    newValue = Math.round(newValue / this.step) * this.step
    //精度漂移
    newValue = Math.floor(newValue * this.precision) / this.precision
    if (newValue === this._value) return
    const oldValue = this._value
    this._value = newValue
    this.updatePosition()
    this.emit('change', newValue, oldValue, this.value)
  }

  boot() {
    this.enable = true
    this.thumb.on(Phaser.Input.Events.DRAG, this.dragHandler, this)
  }

  setValue(newValue: number) {
    this._animatable = this.animate !== false
    this.value = newValue
    return this
  }

  setEnable(e: boolean = true) {
    this.enable = e
    return this
  }

  toggleEnable() {
    this.enable = !this._enable
    return this
  }

  setEndPoints(p1: Vector2Like, p2: Vector2Like): Slider
  setEndPoints(x1: number, y1: number, x2: number, y2: number): Slider
  setEndPoints(p1x1: any, p1y1: any, x2?: any, y2?: any): Slider {
    let p1: Vector2Like
    let p2: Vector2Like
    if (typeof p1x1 === 'number') {
      p1 = { x: p1x1, y: p1y1 }
      p2 = { x: x2, y: y2 }
    } else {
      p1 = p1x1
      p2 = p1y1
    }
    this.startPoint = p1
    this.endPoint = p2
    this.axisRotation = BetweenPoints(p1, p2)
    this.updatePosition()
    return this
  }

  updatePosition() {
    const value = Percent(this._value, this.min, this.max)
    const x = Linear(this.startPoint.x, this.endPoint.x, value)
    const y = Linear(this.startPoint.y, this.endPoint.y, value)

    if (this._animatable) {
      this.thumb.scene.tweens.add({
        targets: this.thumb,
        duration: 300,
        ease: 'Cubic.easeOut',
        ...this.animate,
        x,
        y
      })
    } else {
      this.thumb.setPosition(x, y)
    }
    return this
  }

  private dragHandler(pointer: Phaser.Math.Vector2, x: number, y: number) {
    const start = this.startPoint
    const end = this.endPoint
    let value = 0
    let min = 0
    let max = 0

    if (start.y === end.y) {
      min = Math.min(start.x, end.x)
      max = Math.max(start.x, end.x)
      value = Percent(x, min, max)
    } else if (start.x === end.x) {
      min = Math.min(start.y, end.y)
      max = Math.max(start.y, end.y)
      value = Percent(y, min, max)
    } else {
      const thumb = this.thumb
      let distance = DistanceBetween(x, y, thumb.x, thumb.y)
      let point = RotateAroundDistance({ x, y }, thumb.x, thumb.y, -this.axisRotation, distance)
      point.y = thumb.y
      distance = DistanceBetween(point.x, point.y, thumb.x, thumb.y)
      point = RotateAroundDistance(point, thumb.x, thumb.y, this.axisRotation, distance)

      min = Math.min(start.x, end.x)
      max = Math.max(start.x, end.x)
      value = Percent(point.x, min, max)
    }
    //反向
    if (start.x > end.x || start.y > end.y) {
      value = 1 - value
    }
    this.value = FromPercent(value, this.min, this.max)
  }
}
