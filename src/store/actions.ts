import { Orientations } from '@/constants/orientations'
import { IMissionResult } from '@/interfaces/IMissionResult'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'

export const actions = {
  setCommands ({ commit }:any, commands:string) {
    commit('setCommands', commands)
  },
  setOrientation ({ commit }:any, orientation:Orientations) {
    commit('setOrientation', orientation)
  },
  setStartPosition ({ commit }:any, startPosition:any) {
    commit('setStartPosition', startPosition)
  },
  setMap ({ commit }:any, map:ISquare[][]) {
    commit('setMap', map)
  },
  setMissionState ({ commit }:any, missionState:IMissionResult) {
    commit('setMissionState', missionState)
  },
  pushPosition ({ commit }:any, position:IPosition) {
    commit('pushPosition', position)
  }
}
