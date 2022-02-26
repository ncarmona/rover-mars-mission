import { IPosition } from '@/interfaces/IPosition';
import { config } from '@/config'

export function outsideBoundaries(position:IPosition) {
  const { x, y } = position
  const { mapSize } = config

  return x < 0 || y < 0 || x >= mapSize || y >= mapSize
}