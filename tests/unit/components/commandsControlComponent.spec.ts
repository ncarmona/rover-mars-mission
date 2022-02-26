import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils'
import CommandsControl from '@/components/CommandsControlComponent.vue'


describe('CommandsControlComponent.vue', () => {
  let wrapper:VueWrapper
  let commandInput:DOMWrapper<Element>
  const commandValue = () => wrapper.find('input').element.value
  beforeEach(() => {
    wrapper = shallowMount(CommandsControl)
    commandInput = wrapper.find('input[type="text"]')
  })

  afterEach(() => { commandInput.setValue('')})

  it('Renders commands control label', () => {
    const label = 'Commands'
    expect(wrapper.text()).toMatch(label)
  })
})
