import { IPosition } from '@/interfaces/IPosition'

export function missionNotStarted ():string {
  return 'Configure the mission before start.'
}

export function missionPending ():string {
  return 'Performing mission...'
}

export function missionSuccess ():string {
  return 'Mission successful!!'
}

export function missionObstacle (position:IPosition):string {
  const { x, y } = position

  return 'Mission failed. Obstacle found at x: ' + x + ' y: ' + y
}
