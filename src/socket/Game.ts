import Base, { WSMessage } from './Base'
/**
 * 游戏消息推送
 */
export default class Game extends Base<{
  type: 'CRASH' | 'IN_PROCESS' | 'STARTING' | 'JUMP'
  [key: string]: any
}> {
  path = '/topic/crash'
}
