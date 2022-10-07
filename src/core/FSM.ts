export interface FSMProps {
  start?: string
  states?: { [name: string]: IStateConfig }
  init?: Function
  extend?: {
    [name: string]: any
  }
  enable?: boolean
}

interface IStateConfig {
  name?: string
  next?: string | (() => string)
  enter?: Function
  exit?: Function
}

interface Events {
  StateChangeCallbackType: (state: FSM) => void
  ExitStateCallbackType: (state: FSM) => void
  EnterStateCallbackType: (state: FSM) => void
}
/**
 * FSM:finite state machine 有限状态机,
 *  - 一个对象状态越多，事件越多，越适合有限状态机
 *  - 三个核心要素
 *      - state:状态总数，有限的
 *      - 任何时候都只能处于一种状态
 *      - 某种条件下，会从一种状态转换到另一种状态
 *  - 更多说明：http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html
 */
export default class FSM extends Phaser.Events.EventEmitter {
  constructor(props: Partial<FSMProps> = {}) {
    super()
    if (props.states) {
      this.addStates(props.states)
    }
    if (props.extend) {
      for (const name in props.extend) {
        if (!Object.hasOwn(this, name) || this[name] === void 0) {
          this[name] = props.extend[name]
        }
      }
    }

    this.setEnable(props.enable)
    this.start(props.start)
    props.init?.call(this)
  }
  private _stateLock = false
  private _start?: string
  private _state?: string
  private _prevState?: string
  enable: boolean = true

  set state(newState: string | undefined) {
    if (!this.enable || this._stateLock) return
    if (this._state === newState) return
    this._prevState = this._state
    this._stateLock = true
    this.emit('statechange', this)

    if (this._prevState !== null) {
      const exitEventName = `exit_${this._prevState}`
      const callback = this[exitEventName]
      callback?.call(this)
      this.emit(exitEventName, this)
    }

    this._stateLock = false

    if (this._state !== null) {
      const enterEventName = `enter_${this._state}`
      const callback = this[enterEventName]
      callback?.(this)
      this.emit(enterEventName, this)
    }
  }

  get state() {
    return this._state
  }

  get prevState() {
    return this._prevState
  }

  setEnable(e: boolean = true) {
    this.enable = e
    return this
  }

  toggleEnable() {
    return this.setEnable(!this.enable)
  }

  toJSON() {
    return {
      state: this.state,
      prevState: this.state,
      enable: this.enable,
      start: this._start
    }
  }

  start(state?: string) {
    this._state = state
    this._prevState = undefined
    this._state = state // 不触发statechange事件
    return this
  }

  goto(nextState: string | null) {
    if (nextState !== null) {
      this.state = nextState
    }
    return this
  }

  next() {
    let nextState: string | null = null
    let getNextState = this[`next_${this.state}`]
    if (getNextState) {
      if (typeof getNextState === 'string') {
        nextState = getNextState
      } else {
        nextState = getNextState.call(this)
      }
    }
    this.goto(nextState)
  }

  addState(state: IStateConfig)
  addState(name: string, state: IStateConfig)
  addState(nameOrState: IStateConfig | string, _state?: IStateConfig) {
    let name: string
    let state: IStateConfig
    if (typeof nameOrState !== 'string') {
      state = nameOrState
      name = nameOrState.name!
    } else {
      name = nameOrState
      state = _state!
    }

    const getNextStateCallback = state.next
    if (getNextStateCallback) {
      this[`next_` + name] = getNextStateCallback
    }

    const exitCallback = state.exit
    if (exitCallback) {
      this[`exit_` + name] = exitCallback
    }

    const enterCallback = state.enter
    if (enterCallback) {
      this[`enter_${name}`] = enterCallback
    }
  }

  addStates(states: IStateConfig[] | Record<string, IStateConfig>) {
    if (Array.isArray(states)) {
      states.forEach(this.addState)
    } else {
      for (const name in states) {
        this.addState(name, states[name])
      }
    }
  }

  exec(name: string, ...args: any[]) {
    const fn = this[`${name}_${this.state}`]
    if (!fn) return undefined
    fn.apply(this, args)
    return fn.apply(this, args)
  }

  update(time: number, delta: number) {
    this.exec('update', time, delta)
  }
  preupdate(time: number, delta: number) {
    this.exec('prepdate', time, delta)
  }
  postupdate(time: number, delta: number) {
    this.exec('postupdate', time, delta)
  }
}
