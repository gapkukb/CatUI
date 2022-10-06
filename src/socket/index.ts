import Betting from './Betting'
import Chatroom from './Chatroom'
import UserCount from './UserCount'
import Game from './Game'
import Connection from './Connection'

export const bettingChannel = new Betting()
export const chatroomChannel = new Chatroom()
export const userCountChannel = new UserCount()
export const gameChannel = new Game()
export const connection = new Connection()
