import Sockjs from 'sockjs-client'
import { Stomp } from 'stompjs/lib/stomp.min.js'
import { v4 as uuidv4 } from 'uuid'
import * as channel from '.'

export default class Connection {
  connecter: any
  connect() {
    let socket = new Sockjs('https://www.pgvipp8.com/pg-ws')
    let stomp = Stomp.over(socket)
    stomp.debug = null
    let uuid = uuidv4()

    return new Promise(resolve => {
      this.connecter = stomp.connect(
        {
          Authorization: null
        },
        frame => {
          console.log('链接成功')
          channel.bettingChannel.create(stomp)
          channel.chatroomChannel.create(stomp)
          channel.gameChannel.create(stomp)
          channel.userCountChannel.create(stomp)
          resolve(null)
        }
      )
    })
  }
  disconnect() {
    this.connecter.disconnect()
  }
}
