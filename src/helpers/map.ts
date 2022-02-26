import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'
import { config } from '../config'

export const map = ():any => {
  const generateMapArray = (initialPosition:IPosition):ISquare[][] => {
    const planet = new Array(config.mapSize).fill(1).map(() => new Array(config.mapSize).fill({}))
    for (let i = 0; i < config.mapSize; i++) {
      for (let j = 0; j < config.mapSize; j++) {
        planet[i][j] = fillSquare(i, j, initialPosition)
      }
    }
    return planet
  }

  const fillSquare = (i:number, j:number, initialPosition:IPosition):ISquare => {
    return {
      obstacle: a(i, j, initialPosition),
      position: { x: i, y: j },
      lastPosition: false
    }
  }
  const a = (i:number, j:number, initialPosition:IPosition):boolean =>
    i === initialPosition.x && j === initialPosition.y
      ? false
      : setSquareAsObstacleRandomly()
  const setSquareAsObstacleRandomly = ():boolean => Math.random() < 0.2
  return { generateMapArray }
}
