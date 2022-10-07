import { Component } from '../Component'
import DragSpeed from '../DragSpeed'
import SlowDown from '../SlowDown'
import State from './State'

type Mode = 'x' | 'y'

export interface ScrollerProps {
  /** -  */
  enable: boolean
  /** -  触摸点超出对象范围时，是否终止触摸状态 */
  releaseOnOut: boolean
  /** -  要启用的滑动方向*/
  mode: Mode
  /** -  显示的范围*/
  bounds: {
    bottom: number
    top: number
  }
  /** -  */
  value: number
  /** -  前后两次触摸点之间的距离大于多少时为移动 */
  threshold: number
  /** -  松手后继续滑动一段距离的阻尼(减速)系数 */
  slidingDeceleration: number
  /** -  触底触顶回弹得阻尼(减速)系数 */
  backDeceleration: number
}

export default class Scroller extends Component {
  constructor(component: Phaser.GameObjects.GameObject, props?: Partial<ScrollerProps>) {
    super(component, 'scroller')
    Object.assign(this, props)
    const dragConfig = {
      input: undefined,
      enable: props?.enable ?? true,
      releaseOnOut: props?.enable ?? true
    }

    this.dragState = new DragSpeed(component, dragConfig)
    this._slowDown = new SlowDown()
    this.scene.sys.events.on('preupdate', this._state.update, this._state)
  }
  private _state: any = new State(this, {
    enable: this.enable
  })
  private _slowDown: SlowDown
  private _value = 0
  dragConfig: any
  dragState: DragSpeed
  mode: Mode = 'y'
  threshold = 10
  slidingDeceleration = 5000
  backDeceleration = 2000
  bounds = {}
  minValue = 0
  maxValue = 0

  set enable(e: boolean) {
    super.setEnable(e)
    this._state.setEnable(e)
    this.dragState.setEnable(e)
  }

  get value() {
    return this._value
  }

  set value(value: number) {
    if (value === this._value) return
    const oldValue = this._value

    this._value = value
  }

  get status() {
    return this._state.state
  }

  get isDragging() {
    return this.dragState.isTouching
  }

  get outOfMaxBound() {
    return this.overMax(this.value)
  }

  get outOfMinBound() {
    return this.overMin(this.value)
  }

  get outOfBounds() {
    return this.outOfMinBound || this.outOfMaxBound
  }

  get backEnable() {
    return this.backDeceleration !== 0
  }

  get isPullBack() {
    return this._slowDown.isMoving
  }

  get slidingEnable() {
    return this.slidingDeceleration !== 0
  }

  get isSliding() {
    return this._slowDown.isMoving
  }

  get dragDelta() {
    if (this.mode === 'x') {
      return this.dragState.dx
    }
    if (this.mode === 'y') {
      return this.dragState.dy
    }
    return 0
  }

  get DragSpeed() {
    if (this.mode === 'x') {
      return this.dragState.speedX
    }
    if (this.mode === 'y') {
      return this.dragState.speedY
    }
    return 0
  }

  private overMax(value: number) {
    return value > this.maxValue
  }

  private overMin(value: number) {
    return value > this.minValue
  }

  setMode(mode: Mode) {
    this.mode = mode
    return this
  }

  setThreshold(threshold: number) {
    this.threshold = threshold
    return this
  }
  setSlidingDeceleration(deceleration: number) {
    this.slidingDeceleration = deceleration
    return this
  }
  setBackDeceleration(deceleration: number) {
    this.backDeceleration = deceleration
    return this
  }
  setValue(value: number, clamp: boolean = false) {
    if (clamp) {
      value = Phaser.Math.Clamp(value, this.minValue, this.maxValue)
    }
    this.value = value
    return this
  }

  setBounds(values: number[]): this
  setBounds(value0: number, value1: number): this
  setBounds(value0: number | number[], value1?: number): this {
    let m: number
    let n: number
    if (Array.isArray(value0)) {
      ;[m, n] = value0
    } else {
      m = value0
      n = value1!
    }
    this.minValue = Math.min(m, n)
    this.maxValue = Math.max(m, n)
    return this
  }

  increaseValue(value: number, clamp?: boolean) {
    this.setValue(this.value + value, clamp)
  }

  //enter_DRAG
  onDragStart() {
    this.emit('dragstart')
  }
  //exit_DRAG
  onDragEnd() {
    this.emit('dragend')
  }
  //everyTick_DRAG
  dragging() {
    this.value += this.dragDelta
  }

  //enter_SLIDE
  onSliding() {
    const start = this.value
    const speed = this.DragSpeed
    if (speed === 0) {
      this._slowDown.stop()
      this._state.next()
      return
    }
    this._slowDown.init(start, speed > 0, Math.abs(speed), this.slidingDeceleration)
  }

  //everTick_SLIDE
  sliding(time: number, delta: number) {
    delta /= 1000
    const newValue = this._slowDown.update(delta).value
    if (this.overMax(newValue)) {
      this.value = this.maxValue
      this._slowDown.stop()
    } else if (this.overMin(newValue)) {
      this.value = this.minValue
      this._slowDown.stop()
    } else {
      this.value = newValue
    }
  }

  //enter_BACK
  onPullBack() {
    const start = this.value
    const end = this.outOfMinBound ? this.minValue : this.maxValue
    const distance = Math.abs(end - start)
    const deceleration = this.backDeceleration
    const speed = Math.sqrt(2 * deceleration * distance)
    this._slowDown.init(start, false, speed, deceleration, end)
  }

  //everyTick_BACK

  pullBack(time: number, delta: number) {
    delta /= 1000
    this.value = this._slowDown.update(delta).value
    if (!this._slowDown.isMoving) {
      this._state.next()
    }
  }

  //exit_SLIDE,exit_BACK
  stop() {
    this._slowDown.stop()
  }
}

// new Scroller(new Phaser.GameObjects.Text(), {})
