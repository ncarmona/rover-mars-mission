import { IPosition } from '@/interfaces/IPosition'

export const movements = ():any => {
  const moveForward = (position:IPosition):IPosition => {
    const newPosition = position
    newPosition.y--
    return newPosition
  }
  const moveLeft = (position:IPosition):IPosition => {
    const newPosition = position
    newPosition.x--
    return newPosition
  }
  const moveRight = (position:IPosition):IPosition => {
    const newPosition = position
    newPosition.x++
    return newPosition
  }
  const moveBack = (position:IPosition):IPosition => {
    const newPosition = position
    newPosition.y++
    return newPosition
  }

  return { moveBack, moveForward, moveLeft, moveRight }
}
