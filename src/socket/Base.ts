// import { Client, Subscription } from 'stompjs'
export type WSMessage<T = any> = (json: T) => any

export default abstract class Base<T = any> {
  id = 0
  channel: any
  abstract path: string
  subscribers: WSMessage[] = []
  //   private constructor(){}
  create(client: any) {
    this.channel = client.subscribe(this.path, (response: any) => this.exec(JSON.parse(response.body)))
    return this
  }
  protected exec(json: any) {
    const len = this.subscribers.length
    for (let i = 0; i < len; i++) {
      this.subscribers[i]?.(json)
    }
  }
  add(callback: WSMessage<T>, scope?: any): number {
    this.subscribers[this.id++] = callback.bind(scope)
    return this.id
  }
  remove(id: number) {
    return this.subscribers.splice(id, 1)
  }
  clear() {
    this.id = 0
    this.subscribers = []
    return this
  }
  destory() {
    this.clear()
    this.channel.unsubscribe()
    return this
  }
}
