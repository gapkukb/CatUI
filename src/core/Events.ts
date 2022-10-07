export default abstract class Events {
  private emmiter: Phaser.Events.EventEmitter
  setEvent(emitter, EmitterClass = Phaser.Events.EventEmitter) {
    this.emmiter = new EmitterClass()
  }
  getEmitter() {
    return this.emmiter
  }

  on(event: string | symbol, fn: Function, context?: any) {
    this.emmiter?.on.call(this.emmiter, event, fn, context)
  }
  once(event: string | symbol, fn: Function, context?: any) {
    this.emmiter?.on.call(this.emmiter, event, fn, context)
  }
}
