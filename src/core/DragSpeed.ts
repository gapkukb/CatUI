import { Component } from './Component'
import { PointerEvent } from './typing'
import getLoopDelta from './utils/sys/get-loop-delta'

export interface DragSpeedProps {
  enable: boolean
  holdThreshold: number
  pointerOutReleaseEnable: boolean
}

/**
 * 逻辑组件，只负责触发触摸事件并计算触摸方向和速度
 */
export default class DragSpeed extends Component {
  constructor(component: Phaser.GameObjects.GameObject, props: Partial<DragSpeedProps>) {
    super(component, 'DragSpeed')
    Object.assign(this, props)
    component.setInteractive()
    component.on(Phaser.Input.Events.POINTER_DOWN, this.pointerDownHandler, this)
    component.on(Phaser.Input.Events.POINTER_UP, this.pointerOutHandler, this)
    this.pointerOutReleaseEnable && component.on(Phaser.Input.Events.POINTER_OUT, this.pointerOutHandler, this)
    component.on(Phaser.Input.Events.POINTER_MOVE, this.pointerMoveHandler, this)
    this.scene.sys.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this)
  }

  isTouching = false
  justMoved = false
  holdThreshold = 50
  pointerOutReleaseEnable = true
  pointer: Phaser.Input.Pointer | undefined = undefined
  holdBeginTime: number | undefined = undefined
  x = 0
  y = 0
  prevX = 0
  prevY = 0
  localX = 0
  localY = 0

  get enable() {
    return this._enable
  }
  set enable(e: boolean) {
    super.enable = e
    if (!e) {
      this.isTouching = false
      this.pointer = undefined
    }
  }

  get isDown() {
    return !!this.pointer?.isDown
  }
  get isUp() {
    return !this.pointer?.isDown
  }
  get dx() {
    return this.x - this.prevX
  }
  get dy() {
    return this.y - this.prevY
  }
  get dt() {
    return getLoopDelta(this.scene)
  }
  // 缩小1000倍方便计算
  get dt1000() {
    return this.dt / 1000
  }

  get speed() {
    if (this.x === this.prevX && this.y === this.prevY) return 0
    const distance = Phaser.Math.Distance.Between(this.prevX, this.prevY, this.x, this.y)
    return distance / this.dt1000
  }

  get speedX() {
    return this.dx / this.dt1000
  }

  get speedY() {
    return this.dy / this.dt1000
  }

  private pointerDownHandler: PointerEvent = (pointer, x, y, e) => {
    console.log(1111111111111)

    if (!this.enable) return
    if (!pointer.isDown) return
    if (!this.pointer) return

    this.pointer = pointer
    this.localX = x
    this.localY = y
  }
  private pointerOutHandler: PointerEvent = pointer => {
    if (!this.enable) return
    if (this.pointer !== pointer) return
    this.pointer = undefined
  }
  private pointerMoveHandler: PointerEvent = (pointer, x, y) => {
    if (!this.enable) return
    if (!pointer.isDown) return
    if (this.pointer !== pointer) return
    this.localX = x
    this.localY = y
  }
  preUpdate(time: number, delta: number) {
    if (!this.enable) return
    const pointer = this.pointer
    this.justMoved = false
    if (pointer && !this.isTouching) {
      // 触摸开始
      this.x = this.prevX = pointer.worldX
      this.y = this.prevY = pointer.worldY
      this.isTouching = true
      this.holdBeginTime = 0
      this.emit('touchstart', pointer, this.localX, this.localY)
    } else if (pointer && this.isTouching) {
      // 触摸中
      if (this.x === pointer.x && this.y === pointer.y) {
        //停止不动
        if (this.holdBeginTime === void 0) {
          this.holdBeginTime = time
        } else if (time - this.holdBeginTime > this.holdThreshold) {
          this.prevX = this.x
          this.prevY = this.y
        }
      } else {
        //移动
        this.prevX = this.x
        this.prevY = this.y
        this.x = pointer.worldX
        this.y = pointer.worldY
        this.holdBeginTime = undefined
        this.justMoved = true
        this.emit('touchmove', pointer, this.localX, this.localY)
        return
      }
    }
    if (!pointer && this.isTouching) {
      // 触摸结束
      this.isTouching = false
      this.holdBeginTime = undefined
      this.emit('touchend', pointer)
    }
  }
  setPointerOutReleaseEnable(e: boolean = true) {
    this.pointerOutReleaseEnable = e
    return this
  }
}
