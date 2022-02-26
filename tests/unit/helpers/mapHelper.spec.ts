import { map } from '@/helpers/map'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'
import { config } from '@/config'
describe("Map generateMapArray", () => {
  const { generateMapArray } = map()
  const initialPosition:IPosition = {x: 0, y:0 }
  const { mapSize } = config

  it("Map dimensions must be equals to configured map size.", () => {
    const map:ISquare[][] = generateMapArray(initialPosition)

    const lengthMap = [map.length, map[0].length]
    const expectedLengthMap = [ mapSize, mapSize ]

    expect(lengthMap).toStrictEqual(expectedLengthMap)
  })

  it("Initial position must not be an obstacle", () => {
    const executionResults = []
    const numberOfAttemps:number = 5
    let numberOfAttempsDone:number = 0

    while(numberOfAttemps !== numberOfAttempsDone) {
      const map:ISquare[][] = generateMapArray(initialPosition)
      const { x, y} = initialPosition
      executionResults.push(!map[x][y].obstacle)
      numberOfAttempsDone++
    }
    const expectedResult:boolean = executionResults.every((t:boolean) => t)
    expect(expectedResult).toBeTruthy()
  })

  it("map.position must be equal to x=i and y=j", () => {
    const map:ISquare[][] = generateMapArray(initialPosition)
    const results:boolean[] = []

    for (let i = 0; i<mapSize; i++) {
      for (let j = 0; j<mapSize; j++) {
        const { x, y } = map[i][j].position
        results.push(x == i && y == j)
      }
    }
    const expectedResult:boolean = results.every((e:boolean) => e)
    expect(expectedResult).toBeTruthy()
  })
})