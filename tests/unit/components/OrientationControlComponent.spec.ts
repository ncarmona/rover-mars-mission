import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils"
import OrientationControlComponent from '@/components/OrientationControlComponent.vue'
import { Orientations } from "@/constants/orientations"

describe('Orientation control component', () => {
  const wrapper:VueWrapper = mount(OrientationControlComponent)
  const select:DOMWrapper<HTMLOptionElement>[] = wrapper.find('select').findAll('option')

  it('Select must have 4 selections', () => {
    const expectedNumOfOptions:number = 4
    const numOfOptions:number = select.length

    expect(numOfOptions).toEqual(expectedNumOfOptions)
  })

  it('Select must contain options for north, east, south, west', () => {
    const expectedOrientations:string[] = Object.values(Orientations)
    const orientations:string[] = select.map((o:DOMWrapper<HTMLOptionElement>) => o.element.value)

    expect(orientations).toStrictEqual(expectedOrientations)
  })

  it('default orientation north', () => {
    const optionValue = wrapper.find('select').element.value
    expect(optionValue).toStrictEqual(Orientations.NORTH)
  })

  it('Set orientation to north', () => {
    wrapper.find('select').findAll('option')[0].element.selected = true
    const selectedOrientation = wrapper.find('select').findAll('option').find((e:DOMWrapper<HTMLOptionElement>) => e.element.selected)
    const expectedSelectedOrientationName = selectedOrientation?.element.innerHTML

    expect(expectedSelectedOrientationName).toStrictEqual("North")
  })

  it('Set orientation to west', () => {
    wrapper.find('select').findAll('option')[3].element.selected = true
    const selectedOrientation = wrapper.find('select').findAll('option').find((e:DOMWrapper<HTMLOptionElement>) => e.element.selected)
    const expectedSelectedOrientationName = selectedOrientation?.element.innerHTML

    expect(expectedSelectedOrientationName).toStrictEqual("West")
  })
  it('Set orientation to east', () => {
    wrapper.find('select').findAll('option')[1].element.selected = true
    const selectedOrientation = wrapper.find('select').findAll('option').find((e:DOMWrapper<HTMLOptionElement>) => e.element.selected)
    const expectedSelectedOrientationName = selectedOrientation?.element.innerHTML

    expect(expectedSelectedOrientationName).toStrictEqual("East")
  })
  it('Set orientation to south', () => {
    wrapper.find('select').findAll('option')[2].element.selected = true
    const selectedOrientation = wrapper.find('select').findAll('option').find((e:DOMWrapper<HTMLOptionElement>) => e.element.selected)
    const expectedSelectedOrientationName = selectedOrientation?.element.innerHTML

    expect(expectedSelectedOrientationName).toStrictEqual("South")
  })
})