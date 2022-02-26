import { mount, VueWrapper } from "@vue/test-utils"
import SquareComponent from '@/components/SquareComponent.vue'
import { ISquare } from "@/interfaces/ISquare"
import { createStore } from "vuex"
import { IPosition } from "@/interfaces/IPosition"

describe('Square component', () => {
  const squareWithObstacle:ISquare = {
    lastPosition: false,
    obstacle: true,
    position: { x:0, y:0 }
  }
  const squareWithNoObstacle:ISquare = {
    lastPosition: false,
    obstacle: false,
    position: { x:0, y:0 }
  }
  const storeSquareWithNoObstacleComponent = createStore({
    state: {
      path: [
        { x: 3, y:3 },
        { x: 2, y:3 },
        { x: 1, y:3 },
        { x: 0, y:0 },
      ]
    },
    getters: { lastRoverPosition: (state:any):IPosition => state.path[state.path.length - 1] }
  })
  const storeSquareWithObstacleComponent = createStore({
    state: {
      path: [
        { x: 3, y:3 },
        { x: 2, y:3 },
        { x: 1, y:3 },
        { x: 0, y:3 },
      ]
    },
    getters: { lastRoverPosition: (state:any):IPosition => state.path[state.path.length - 1] }
  })
  const squareWithNoObstacleComponent:VueWrapper = mount(SquareComponent, {
    props: {
      square: squareWithNoObstacle
    },
    global: {
      plugins: [storeSquareWithNoObstacleComponent]
    }
  })
  const squareWithObstacleComponent:VueWrapper = mount(SquareComponent, {
    props: {
      square: squareWithObstacle
    },
    global: {
      plugins: [storeSquareWithObstacleComponent]
    }
  })

  it('Square with an obstacle have .obstacle class', () => {
    const squareClasses = squareWithObstacleComponent.find('div').attributes('class')
    expect(squareClasses).toStrictEqual('obstacle')
  })

  it('Square with an obstacle have .obstacle class', () => {
    const squareClasses = squareWithNoObstacleComponent.find('div').attributes('class')
    expect(squareClasses).toStrictEqual('')
  })

  it('Square must be lastPosition', () => {
    const mark:string = 'X'
    const squareInnerContent = squareWithNoObstacleComponent.find('span').element.innerHTML
    expect(squareInnerContent).toStrictEqual(mark)
  })
  it('Square must not be lastPosition', () => {
    const squareInnerContent = squareWithObstacleComponent.find('span').exists()
    expect(squareInnerContent).toBeFalsy()
  })
})