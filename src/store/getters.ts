import { IMission } from '@/interfaces/IMission'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'

export const getters = {
  missionData: (state:any):IMission => state.missionData,
  missionState: (state:any):IMission => state.missionState,
  path: (state:any):IPosition[] => state.path,
  lastRoverPosition: (state:any):IPosition => state.path[state.path.length - 1],
  map: (state:any):ISquare[][] => state.map
}
