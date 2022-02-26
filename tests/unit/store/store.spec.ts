import { MissionState } from '@/constants/missionStates'
import { Orientations } from '@/constants/orientations'
import { missionNotStarted, missionObstacle, missionPending, missionSuccess } from '@/helpers/missionMessages'
import { mutations } from '@/store/mutations'
import { state } from '@/store/state'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'

import { map } from '@/helpers/map'
import { IMissionResult } from '@/interfaces/IMissionResult'
describe("Store test", () => {

  it("Rover by default facing NORTH", () => {
    const storeOrientation:Orientations = state.missionData.orientation

    expect(storeOrientation).toStrictEqual(Orientations.NORTH)
  })
  it("Default mission state is MissionState.NOT_STARTED", () => {
    const storeInitialMissionState:MissionState = state.missionState.state

    expect(storeInitialMissionState).toStrictEqual(MissionState.NOT_STARTED)    
  })
  it("Default mission state message is missionNotStarted", () => {
    const storeInitialMissionMessage:string = state.missionState.message

    expect(storeInitialMissionMessage).toStrictEqual(missionNotStarted())    
  })

  it("Set orientation", () => {
    mutations.setOrientation(state, Orientations.EAST)
    const storeOrientation:Orientations = state.missionData.orientation

    expect(storeOrientation).toStrictEqual(Orientations.EAST)
  })

  it("Set initial position", () => {
    const expectedPosition:IPosition = { x:2, y:2 }

    mutations.setStartPosition(state, { axis:'x', value:expectedPosition.x })
    mutations.setStartPosition(state, { axis:'y', value:expectedPosition.y })

    const storeStartPosition:IPosition = state.missionData.startPosition

    expect(storeStartPosition).toStrictEqual(expectedPosition)
  })

  it("Set commands", () => {
    const expectedCommands:string = 'fff'
    mutations.setCommands(state, expectedCommands)

    const storeCommands:string = state.missionData.commands

    expect(storeCommands).toStrictEqual(expectedCommands)
  })

  it("Set map", () => {
    const initialPosition:IPosition = { x:0, y:0 }
    const { generateMapArray } = map()
    const expectedMap:ISquare[][] = generateMapArray(initialPosition)

    mutations.setMap(state, expectedMap)
    const generatedMap:ISquare[][] = state.map!

    expect(generatedMap).toStrictEqual(expectedMap)
  })

  it("Set mission state to pending", () => {
    const expectedMissionState:IMissionResult = {
      state: MissionState.PENDING,
      message: missionPending()
    }
    mutations.setMissionState(state, expectedMissionState)
    const storeMissionState:IMissionResult = state.missionState

    expect(storeMissionState).toStrictEqual(expectedMissionState)
  })

  it("Set mission state to obstacle", () => {
    const obstaclePosition:IPosition = { x: 2, y: 2 }
    const expectedMissionState:IMissionResult = {
      state: MissionState.OBSTACLE,
      message: missionObstacle(obstaclePosition)
    }
    mutations.setMissionState(state, expectedMissionState)
    const storeMissionState:IMissionResult = state.missionState

    expect(storeMissionState).toStrictEqual(expectedMissionState)
  })

  it("Set mission state to success", () => {
    const expectedMissionState:IMissionResult = {
      state: MissionState.SUCCESS,
      message: missionSuccess()
    }
    mutations.setMissionState(state, expectedMissionState)
    const storeMissionState:IMissionResult = state.missionState

    expect(storeMissionState).toStrictEqual(expectedMissionState)    
  })

  it("Push position", () => {
    const positions:IPosition[] = [
      {x:0, y:0},
      {x:1, y:0},
      {x:2, y:0},
      {x:3, y:0}
    ]
    positions.forEach((p:IPosition) => mutations.pushPosition(state, p))
    let storePosition = state.path
    storePosition.shift()
    expect(storePosition).toStrictEqual(positions)
  })
})