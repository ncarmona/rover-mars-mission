import { IPosition } from '@/interfaces/IPosition'
import { movements } from '@/helpers/movement'

describe("Movements helper", () => {
  let position:IPosition = { x: 1, y:1 }

  const { moveForward, moveBack, moveLeft, moveRight } = movements()

  const expectedResultMoveForward:IPosition = { x: 1, y:0 }
  const expectedResultMoveBack:IPosition = { x: 1, y:2 }
  const expectedResultMoveLeft:IPosition = { x: 0, y:1 }
  const expectedResultMoveRight:IPosition = { x: 2, y:1 }
  afterEach(() => position = { x: 1, y:1 })

  it ("moveForward", () => {
    const result = moveForward(position)

    expect(result).toStrictEqual(expectedResultMoveForward)
  })
  it ("moveLeft", () => {
    const result = moveLeft(position)

    expect(result).toStrictEqual(expectedResultMoveLeft)
  })
  it ("moveBack", () => {
    const result = moveBack(position)

    expect(result).toStrictEqual(expectedResultMoveBack)
  })
  it ("moveRight", () => {
    const result = moveRight(position)

    expect(result).toStrictEqual(expectedResultMoveRight)
  })
})