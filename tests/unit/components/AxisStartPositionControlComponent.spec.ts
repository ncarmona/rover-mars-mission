import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils'
import AxisStartPositionControlComponent from '@/components/AxisStartPositionControlComponent.vue'
import { createStore } from 'vuex'
import { DomEventNameWithModifier } from '@vue/test-utils/dist/constants/dom-events'

describe('AxisStartPositionControlComponent.vue', () => {
  let wrapper:VueWrapper
  let commandInput:DOMWrapper<Element>
  let mockedFn:any

  beforeEach(() => {
    mockedFn = jest.fn()
    const store = createStore({
      state: {
        missionData: {
          startPosition: {
            x: 0,
            y: 0
          }
        }
      },
      mutations: {setStartPosition: mockedFn},
      actions: {
        setStartPosition ({ commit }:any, startPosition:any) {
          commit('setStartPosition', startPosition)
        },
      }
    })
    wrapper = shallowMount(AxisStartPositionControlComponent,{
      global: {
        plugins: [store]
      },
      props: {
        labelText: "axis text",
        axisName: "x"
      }
    })
    commandInput = wrapper.find('input[type="number"]')
  })

  afterEach(() => { commandInput.setValue('')})

  it('Renders commands control label', () => {
    const msg = 'axis text'
    expect(wrapper.text()).toMatch(msg)
  })

  it('Axis input present', () => {
    expect(commandInput.exists).toBeTruthy()
  })

  it('Axis must be stored in vuex', async () => {
    commandInput.setValue(10)
    await commandInput.trigger('keyup')
    expect(mockedFn).toHaveBeenCalled()
  })
})
