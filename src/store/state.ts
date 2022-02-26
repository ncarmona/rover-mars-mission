import { MissionState } from '@/constants/missionStates'
import { Orientations } from '@/constants/orientations'
import { missionNotStarted } from '@/helpers/missionMessages'

export const state = {
  missionData: {
    commands: '',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 0,
      y: 0
    }
  },
  missionState: {
    state: MissionState.NOT_STARTED,
    message: missionNotStarted()
  },
  path: [{}],
  map: undefined
}
