import { Orientations } from '@/constants/orientations'
import { IMissionResult } from '@/interfaces/IMissionResult'
import { IPosition } from '@/interfaces/IPosition'

export const mutations = {
  setCommands (state:any, commands:any):void {
    state.missionData.commands = commands
  },
  setOrientation (state:any, orientation:Orientations):void {
    state.missionData.orientation = orientation
  },
  setStartPosition (state:any, startPosition:any):void {
    const { axis, value } = startPosition
    const val = value === '' ? 0 : value

    if (axis === 'x') state.missionData.startPosition.x = val
    if (axis === 'y') state.missionData.startPosition.y = val
  },
  setMap (state:any, map:any):void {
    state.map = map
  },
  setMissionState (state:any, missionState:IMissionResult):void {
    state.missionState = missionState
  },
  pushPosition (state:any, position:IPosition):void {
    state.path.push(position)
  }
}
