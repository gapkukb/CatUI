import getGame from './get-game'

export default function getLoopDelta(game: any): number {
  return getGame(game).loop.delta
}
