import Client from 'sockjs-client'
import stompjs from 'stompjs'
import { v4 as uuidv4 } from 'uuid'
import * as channel from '.'

export default class Connection {
  connecter: any
  connect() {
    let socket = new Client('wss://www.pgvipp8.com/pg-ws/847/kxhg0gmc/websocket')
    let stomp = stompjs.over(socket)
    let uuid = uuidv4()
    this.connecter = stomp.connect(
      {
        Authorization: null
      },
      frame => {
        console.log('链接成功')
        // channel.BettingChannel.create(stomp)
        // channel.ChatroomChannel.create(stomp)
        // channel.GameChannel.create(stomp)
        // channel.UserCountChannel.create(stomp)
      }
    )
  }
  disconnect() {
    this.connecter.disconnect()
  }
}
