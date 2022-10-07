export interface MovementProps {
  value: number
  speed: number
  acceleration: number
}

export default class Movement {
  constructor(props?: Partial<MovementProps>) {
    this.reset()
    Object.assign(this, props)
  }
  value: number
  speed: number
  acceleration: number

  get isMoving() {
    return this.speed > 0
  }

  reset() {
    this.value = 0
    this.speed = 0
    this.acceleration = 0
  }
  setValue(value: number) {
    this.value = value
    return this
  }
  setSpeed(value: number) {
    //0 - 停止 >0 - 移动
    this.speed = value
    return this
  }
  setAcceleration(value: number) {
    //0 - 匀速 >0 加速 <0 减速
    this.acceleration = value
    return this
  }

  updateSpeed(delta: number) {
    if (this.acceleration !== 0) {
      this.speed += this.acceleration * delta
      if (this.speed < 0) {
        this.speed = 0
      }
    }
    return this
  }
  getDeltaValue(delta: number) {
    this.updateSpeed(delta)
    if (this.speed < 0) {
      this.speed = 0
    }
    return this.speed * delta
  }

  update(delta: number) {
    this.updateSpeed(delta)
    if (this.speed > 0) {
      this.value += this.getDeltaValue(delta)
    }
    return this
  }
}
