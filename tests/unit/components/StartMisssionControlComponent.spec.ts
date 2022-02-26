import { mount, VueWrapper } from "@vue/test-utils"
import StartMissionControlComponent from '@/components/StartMissionControlComponent.vue'
import { createStore } from "vuex"
import { MissionState } from "@/constants/missionStates"
import { missionPending } from "@/helpers/missionMessages"
import { IMissionResult } from "@/interfaces/IMissionResult"
import mitt from "mitt"
import { IMission } from "@/interfaces/IMission"
import { Orientations } from "@/constants/orientations"
import { ISquare } from "@/interfaces/ISquare"

describe("Start mission control", () => {
  const setMapMock = jest.fn()
  const setMissionStateMock = jest.fn()
  const missionState = {
    state: MissionState.PENDING,
    message: missionPending()
  }
  const getters = {
    missionData: (state:any):IMission => state.missionData
  }
  const mutations = { setMap: setMapMock, setMissionState: setMissionStateMock }
  const actions = {
    setMap ({ commit }:any, map:ISquare[][]) {
      commit('setMap', map)
    },
    setMissionState ({ commit }:any, missionState:IMissionResult) {
      commit('setMissionState', missionState)
    }      
  }
  const validMissionData = {
    commands: 'fff',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 0,
      y: 0
    }   
  }
  const missionDataWithoutCommands = {
    commands: '',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 0,
      y: 0
    }       
  }
  const missionDataLowerThanZeroXAxis = {
    commands: 'fff',
    orientation: Orientations.NORTH,
    startPosition: {
      x: -1,
      y: 0
    }       
  }  
  const missionDataLowerThanZeroYAxis = {
    commands: 'fff',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 0,
      y: -1
    }       
  }  
  const missionDataGreaterThanMapSizeYAxis = {
    commands: 'fff',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 0,
      y: 100
    }       
  }  
  const missionDataGreaterThanMapSizeXAxis = {
    commands: 'fff',
    orientation: Orientations.NORTH,
    startPosition: {
      x: 100,
      y: 0
    }       
  }  
  const validMissionDataStore = createStore({
    state: {
      missionData: validMissionData,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })
  const missionDataGreaterThanMapSizeYAxisStore = createStore({
    state: {
      missionData: missionDataGreaterThanMapSizeYAxis,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })
  const missionDataGreaterThanMapSizeXAxisStore = createStore({
    state: {
      missionData: missionDataGreaterThanMapSizeXAxis,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })
  const missionDataLowerThanZeroXAxisStore = createStore({
    state: {
      missionData: missionDataLowerThanZeroXAxis,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })
  const missionDataLowerThanZeroYAxisStore = createStore({
    state: {
      missionData: missionDataLowerThanZeroYAxis,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })
  const missionDataWithoutCommandsStore = createStore({
    state: {
      missionData: missionDataWithoutCommands,
      missionState: missionState
    },
    getters: getters,
    mutations: mutations,
    actions: actions
  })  
  const emit = mitt()

  it('Mission must not start if there is not commands', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [missionDataWithoutCommandsStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).not.toBeCalled()
  })
  it('Mission must not start if X axis it is lower than zero', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [missionDataLowerThanZeroXAxisStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).not.toBeCalled()
  })
  it('Mission must not start if Y axis it is lower than zero', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [missionDataLowerThanZeroYAxisStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).not.toBeCalled()
  })
  it('Mission must not start if X axis it is greater than mapSize', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [missionDataGreaterThanMapSizeXAxisStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).not.toBeCalled()
  })
  it('Mission must not start if Y axis it is greater than mapSize', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [missionDataGreaterThanMapSizeYAxisStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).not.toBeCalled()
  })
  it('Mission must start if there is commands and X and Y axis are between zero and mapSize', () => {
    const wrapper:VueWrapper = mount(StartMissionControlComponent, {
      global: {
        plugins: [validMissionDataStore],
        provide: {
          emit : emit
        }
      },
    })
    wrapper.find('button').trigger('click')
    expect(setMapMock).toBeCalled()    
  })
})