import FSM, { FSMProps } from '../FSM'
import Scroller from './Scroller'

const enum CONST {
  DRAG = 'DRAG',
  SLIDE = 'SLIDE',
  IDLE = 'IDLE',
  BACK = 'BACK',
  DRAG_BEGIN = 'DRAG_BEGIN'
}

export interface StateProps extends FSMProps {}
/**
 * scroller状态机
 */
export default class State extends FSM {
  constructor(public parent: Scroller, props: Partial<StateProps> = {}) {
    super(props)
    this.init
  }

  init() {
    this.start(CONST.IDLE)
  }
  // idle -> drag_begin|drag
  next_IDLE() {
    let nextState: string | undefined
    let parent = this.parent as any
    let dragState = parent.dragState

    if (dragState.isDown) {
      nextState = parent.dargThreshold === 0 ? CONST.DRAG : CONST.DRAG_BEGIN
    }
    return nextState
  }

  update_IDLE(time: number, delta: number) {
    this.next()
  }

  // IDLE
  // drag_begin -> drag|idle

  next_DRAG_BEGIN() {
    let nextState: string | undefined
    let parent = this.parent
    let dragState = parent.dragState

    if (dragState.isDown) {
      //   nextState = parent.dargThreshold === 0 ? CONST.DRAG : CONST.DRAG_BEGIN
    } else {
      nextState = CONST.IDLE
    }
    return nextState
  }

  update_DRAG_BEGIN() {
    this.next()
  }

  // DRAG_BEGIN,拖拽开始
  // drag -> back|slide|idle

  enter_DRAG() {}
  next_DRAG() {}
  update_DRAG() {}
  exit_DRAG() {}

  //drag
  // back -> drag|idle
  enter_BACK() {}
  next_BACK() {}
  update_BACK() {}
  exit_BACK() {}

  //slide
  // back -> drag|idle
  enter_SLIDE() {}
  next_SLIDE() {}
  update_SLIDE() {}
  exit_SLIDE() {}
}
