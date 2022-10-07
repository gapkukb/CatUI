// import { Component, TParent } from './Component'

// type PointerEvent = (pointer: Phaser.Input.Pointer, x: number, y: number, e: Phaser.Types.Input.EventData) => void

// export const CLICK_MODE = {
//   press: 0,
//   pointerdown: 0,
//   release: 1,
//   pointerup: 1
// }

// export interface ButtonProps {
//   enable: boolean
//   mode: number
//   clickInterval: number
//   threshold: number
// }
// export default class Button extends Component {
//   private _enable = true
//   pointer: Phaser.Input.Pointer | undefined = undefined
//   clickTime: number | undefined = undefined
//   mode: 0 | 1 | keyof typeof CLICK_MODE = 1
//   clickInterval = 100
//   threshold = 0

//   constructor(private box: Phaser.GameObjects.GameObject, props?: Partial<ButtonProps>) {
//     super(box, 'button')
//     Object.assign(this, props)
//     box.setInteractive()
//     const e = Phaser.Input.Events
//     box
//       .on(e.POINTER_DOWN, this.pointerDownHandler, this)
//       .on(e.POINTER_UP, this.pointerUpHandler, this)
//       .on(e.POINTER_OUT, this.pointerOutHandler, this)
//       .on(e.POINTER_MOVE, this.pointerMoveHandler, this)
//       .on(e.POINTER_OVER, this.pointerOverHandler, this)
//       .on(e.POINTER_DOWN_OUTSIDE, this.pointerDownOutsideHandler, this)
//   }

//   get enable() {
//     return this._enable
//   }

//   set enable(e: boolean) {
//     if (this._enable === e) return
//     if (!e) {
//       this.cancel()
//     }
//     this._enable = e
//     this.emit(e ? 'enable' : 'disabled', this, this.parent)
//   }

//   setEnable(e: boolean = true) {
//     this.enable = e
//     return this
//   }

//   toogleEnable() {
//     return this.setEnable(!this.enable)
//   }

//   setThreshold(threshold) {
//     this.threshold = threshold
//     return this
//   }

//   setClickInterval(interval: number) {
//     this.clickInterval = interval
//   }

//   setMode(mode: Button['mode']) {
//     this.mode = mode
//   }

//   private pointerDownHandler: PointerEvent = (pointer, localX, localY, e) => {
//     if (this.pointer) return
//     this.pointer = pointer
//     if (this.mode === 0) {
//       this.click(pointer.downTime, pointer, e)
//     }
//   }
//   private pointerUpHandler: PointerEvent = (pointer, localX, localY, e) => {
//     if (this.pointer !== pointer) return
//     this.pointer = undefined
//     if (this.mode === 1) {
//       this.click(pointer.upTime, pointer, e)
//     }
//   }
//   private pointerOutHandler(pointer: Phaser.Input.Pointer, e: Phaser.Types.Input.EventData) {
//     if (this.pointer !== pointer) return
//     this.cancel()
//   }

//   private pointerMoveHandler: PointerEvent = (pointer, localX, localY, e) => {
//     if (this.pointer !== pointer) return
//     if (!this.threshold) return
//     if (pointer.getDistance() >= this.threshold) {
//       this.cancel()
//     }
//   }
//   private pointerOverHandler: PointerEvent = (pointer, localX, localY, e) => {
//     if (!this.enable) return this
//     return this._emit('over', pointer, e)
//   }
//   private pointerDownOutsideHandler: PointerEvent = (pointer, localX, localY, e) => {
//     if (!this.enable) return this
//     return this._emit('out', pointer, e)
//   }

//   private click(now: number, pointer: Phaser.Input.Pointer, e: Phaser.Types.Input.EventData) {
//     if (!this.enable) return this
//     if (!now) {
//       //fire click
//       return this._emit('click', pointer, e)
//     }
//     this.pointer = undefined
//     if (this.clickTime) {
//       if (now - this.clickTime <= this.clickInterval) {
//         return this
//       }
//     }
//     this.clickTime = now
//     return this._emit('click', pointer, e)
//   }

//   private cancel() {
//     this.pointer = undefined
//     return this
//   }

//   private _emit(eventName: string, pointer: Phaser.Input.Pointer, e: Phaser.Types.Input.EventData) {
//     this.emit(eventName, this, this.parent, pointer, e)
//     return this
//   }

//   on(event: 'click' | 'over' | 'out' | 'disable' | 'enable', fn: Function, context?: any) {
//     super.on(event, fn, context)
//     return this
//   }
//   //   shutdown() {
//   //     this.pointer = null as any
//   //     // super.shutdown()
//   //   }
// }
