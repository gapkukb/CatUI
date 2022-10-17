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
    this.init()
  }

  init() {
    this.start(CONST.IDLE)
  }
  // idle -> drag_begin->(drag->exit_drag)|idle
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

  // IDLE-> drag_begin -> drag|idle

  next_DRAG_BEGIN() {
    let nextState: string | undefined
    let parent = this.parent
    let dragState = parent.dragManager

    if (dragState.isDown) {
      //   nextState = parent.dargThreshold === 0 ? CONST.DRAG : CONST.DRAG_BEGIN
    } else {
      //   nextState = CONST.IDLE
    }
    return nextState
  }

  update_DRAG_BEGIN() {
    this.next()
  }

  // DRAG_BEGIN,拖拽开始 drag -> back|slide|idle
  enter_DRAG() {
    this.parent.onDragStart()
  }
  next_DRAG() {
    let nextState: string | undefined
    let parent = this.parent
    let dragState = parent.dragManager

    if (dragState.isUp) {
      if (parent.outOfBounds) {
        nextState = CONST.BACK
      } else if (parent.slidingEnable) {
        nextState = CONST.SLIDE
      } else {
        // nextState = CONST.IDLE
      }
    }
  }
  update_DRAG() {
    let parent = this.parent
    let dragState = parent.dragManager

    if (dragState.justMoved) {
      parent.dragging()
    }
    this.next()
  }
  exit_DRAG() {
    this.parent.onDragEnd()
  }

  //drag
  // back -> drag|idle
  enter_BACK() {
    this.parent.onPullBack()
  }
  next_BACK() {
    let nextState: string | undefined
    let parent = this.parent
    let dragState = parent.dragManager

    if (dragState.isDown) {
      nextState = CONST.DRAG
    } else if (!parent.isPullBack) {
      //   nextState = CONST.IDLE
    }
    return nextState
  }
  update_BACK(time: number, delta: number) {
    this.parent.pullBack(time, delta)
    this.next()
  }
  exit_BACK() {
    this.parent.stop()
  }

  //slide
  // back -> drag|idle
  enter_SLIDE() {
    this.parent.onSliding()
  }
  next_SLIDE() {
    let nextState: string | undefined
    let parent = this.parent
    let dragState = parent.dragManager

    if (dragState.isDown) {
      nextState = CONST.DRAG
    } else {
      //   nextState = CONST.IDLE
    }
    return nextState
  }
  update_SLIDE(time: number, delta: number) {
    this.parent.sliding(time, delta)
    this.next()
  }
  exit_SLIDE() {
    this.parent.stop()
  }
}
