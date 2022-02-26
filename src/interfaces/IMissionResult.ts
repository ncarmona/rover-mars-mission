import { MissionState } from '../constants/missionStates'
export interface IMissionResult {
  state: MissionState,
  message: string
}