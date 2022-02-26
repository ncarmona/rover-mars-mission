import { mount, VueWrapper } from "@vue/test-utils"
import StartPositionControlComponent from '@/components/StartPositionControlComponent.vue'

describe('Start position control component', () => {
  const wrapper:VueWrapper = mount(StartPositionControlComponent)

  it('X input axis must render', () => expect(wrapper.text()).toContain('x:'))
  it('Y input axis must render', () => expect(wrapper.text()).toContain('y:'))
})
