import { missionObstacle } from '@/helpers/missionMessages'
import { IPosition } from '@/interfaces/IPosition'

describe("Mission messages helper", () => {
  const position:IPosition = { x:0, y:0 }
  it("When obstacle found display the coords passed by parameter in missionObstacle function", () => {
    const resultString:string = 'Mission failed. Obstacle found at x: ' + position.x + ' y: ' + position.y
    const expectedResultString:string = missionObstacle(position)
    
    expect(resultString).toStrictEqual(expectedResultString)
  })
})