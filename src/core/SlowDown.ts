import Movement from './Movement'

export interface SlowDownProps {
  value: number
  speed: number
  acceleration: number
}

export default class SlowDown {
  constructor(props?: Partial<SlowDownProps>) {
    Object.assign(this, props)
  }
  value: number
  end: number
  dir: boolean // true:+,false:-
  movement = new Movement()

  get isMoving() {
    return this.movement.isMoving
  }

  init(start: number, dir: boolean, speed: number, deceleration: number, end?: number) {
    this.value = start
    this.end = end!
    this.dir = end === void 0 ? dir : start < end
    this.movement.setSpeed(speed).setAcceleration(-deceleration)
    return this
  }

  stop() {
    this.movement.reset()
  }

  update(delta: number) {
    let d = this.movement.getDeltaValue(delta)
    if (!this.dir) {
      d = -d
    }
    if (this.end === void 0) {
      this.value += d
    } else if (d === 0) {
      this.value += this.end
    } else {
      this.value += d
      if (this.dir) {
        if (this.value > this.end) {
          this.value = this.end
        }
      } else {
        if (this.value < this.end) {
          this.value = this.end
        }
      }
    }
    return this
  }
}
