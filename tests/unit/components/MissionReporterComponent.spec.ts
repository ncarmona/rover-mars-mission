import { MissionState } from "@/constants/missionStates"
import { missionNotStarted, missionObstacle, missionPending, missionSuccess } from "@/helpers/missionMessages"
import { IMissionResult } from "@/interfaces/IMissionResult"
import { IPosition } from "@/interfaces/IPosition"
import { mount, VueWrapper } from "@vue/test-utils"
import { createStore } from "vuex"
import MissionReporterComponent from '@/components/MissionReporterComponent.vue'
import { IMission } from "@/interfaces/IMission"

describe("MissionReporterComponent", () => {
  const obstaclePosition:IPosition = { x:3, y:3 }
  const expectMissionNotStarted:IMissionResult = {
    state: MissionState.NOT_STARTED,
    message: missionNotStarted()
  }
  const expectMissionPending:IMissionResult = {
    state: MissionState.PENDING,
    message: missionPending()
  }
  const expectMissionObstacle:IMissionResult = {
    state: MissionState.OBSTACLE,
    message: missionObstacle(obstaclePosition)
  }
  const expectMissionSuccess:IMissionResult = {
    state: MissionState.SUCCESS,
    message: missionSuccess()
  }

  const storeNotStartedMission = createStore({
    state: { missionState: expectMissionNotStarted },
    getters: { missionState: (state:any):IMission => state.missionState }
  })
  const storePendingMission = createStore({
    state: { missionState: expectMissionPending },
    getters: { missionState: (state:any):IMission => state.missionState }
  })
  const storeObstacleMission = createStore({
    state: { missionState: expectMissionObstacle },
    getters: { missionState: (state:any):IMission => state.missionState }
  })
  const storeSuccessMission = createStore({
    state: { missionState: expectMissionSuccess },
    getters: { missionState: (state:any):IMission => state.missionState }
  })
  it("Mission must not start", () => {
    const wrapper:VueWrapper = mount(MissionReporterComponent, {
      global: {
        plugins: [storeNotStartedMission]
      }
    })
    const expectedMessage:string = missionNotStarted()
    
    expect(wrapper.text()).toContain(expectedMessage)
  })
  it("Mission must be pending", () => {
    const wrapper:VueWrapper = mount(MissionReporterComponent, {
      global: {
        plugins: [storePendingMission]
      }
    })
    const expectedMessage:string = missionPending()
    
    expect(wrapper.text()).toContain(expectedMessage)
  })
  it("Mission must found an obstacle", () => {
    const wrapper:VueWrapper = mount(MissionReporterComponent, {
      global: {
        plugins: [storeObstacleMission]
      }
    })
    const expectedMessage:string = missionObstacle(obstaclePosition)
    
    expect(wrapper.text()).toContain(expectedMessage)
  })
  it("Mission must success", () => {
    const wrapper:VueWrapper = mount(MissionReporterComponent, {
      global: {
        plugins: [storeSuccessMission]
      }
    })
    const expectedMessage:string = missionSuccess()
    
    expect(wrapper.text()).toContain(expectedMessage)
  })
})