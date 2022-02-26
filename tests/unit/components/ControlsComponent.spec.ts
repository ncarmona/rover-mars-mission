import { mount, VueWrapper } from "@vue/test-utils"
import ControlsComponent from '@/components/ControlsComponent.vue'
import store from '@/store/index'

//TODO: injection "emit" not found.
describe("Controls component", () => {
  const wrapper:VueWrapper = mount(ControlsComponent, {
    global: {
      plugins: [store]
    }
  })
  const controlersLabel = {
    commands: "Commands:",
    orientation: "Orientation:",
    xAxis: "x:",
    yAxis: "y:",
    startMission: "Start mission!"
  }

  it("Commands control rendered", () => expect(wrapper.text()).toContain(controlersLabel.commands))
  it("Orientation control rendered", () => expect(wrapper.text()).toContain(controlersLabel.orientation))
  it("xAxis control rendered", () => expect(wrapper.text()).toContain(controlersLabel.xAxis))
  it("yAxis control rendered", () => expect(wrapper.text()).toContain(controlersLabel.yAxis))
  it("start mision control rendered", () => expect(wrapper.text()).toContain(controlersLabel.startMission))
})