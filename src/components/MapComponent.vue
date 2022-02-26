<template>
  <div v-if="mapGenerated" class="map">
    <div v-for="(i, iindex) in mapSize" :key="i">
      <div v-for="(j, jindex) in mapSize" :key="j">
        <Square-component :square="map[iindex][jindex]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Commands } from '@/constants/commands'
import { MissionState } from '@/constants/missionStates'
import { Orientations } from '@/constants/orientations'
import { IMission } from '@/interfaces/IMission'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'
import { computed, defineComponent, inject, ref, Ref } from 'vue'
import { Store, useStore } from 'vuex'
import { config } from '../config'
import SquareComponent from './SquareComponent.vue'
import { IMissionResult } from '@/interfaces/IMissionResult'
import { missionObstacle, missionSuccess } from '@/helpers/missionMessages'
import { movements } from '../helpers/movement'
export default defineComponent({
  components: {
    'Square-component': SquareComponent
  },
  setup () {
    const store:Store<any> = useStore()
    const emit:any = inject('emit')

    const { moveBack, moveForward, moveLeft, moveRight } = movements()

    const mission:Ref<IMission | undefined> = ref()

    const map = computed(() => store.getters.map)
    const mapGenerated = computed(() => store.getters.map !== undefined)
    const mapSize = computed(() => config.mapSize)

    const getNextCommand = (commands:string):string => commands[0]
    const removeCommand = (commands:string):string => commands.substring(1)
    const getPositionData = (position:IPosition):ISquare => store.getters.map[position.x][position.y]
    const missionPending = (commands:string):boolean => commands.length !== 0

    const performMovement = (command:string, orientation:Orientations, currentPosition:IPosition):IPosition => {
      let movement:IPosition = { ...currentPosition }
      if (orientation === Orientations.NORTH) {
        if (command === Commands.FORWARD) movement = moveForward(currentPosition)
        if (command === Commands.LEFT) movement = moveLeft(currentPosition)
        if (command === Commands.RIGHT) movement = moveRight(currentPosition)
      }
      if (orientation === Orientations.EAST) {
        if (command === Commands.FORWARD) movement = moveLeft(currentPosition)
        if (command === Commands.LEFT) movement = moveForward(currentPosition)
        if (command === Commands.RIGHT) movement = moveBack(currentPosition)
      }
      if (orientation === Orientations.SOUTH) {
        if (command === Commands.FORWARD) movement = moveBack(currentPosition)
        if (command === Commands.LEFT) movement = moveRight(currentPosition)
        if (command === Commands.RIGHT) movement = moveLeft(currentPosition)
      }
      if (orientation === Orientations.WEST) {
        if (command === Commands.FORWARD) movement = moveRight(currentPosition)
        if (command === Commands.LEFT) movement = moveBack(currentPosition)
        if (command === Commands.RIGHT) movement = moveForward(currentPosition)
      }

      return movement
    }

    const obstacleFound = (position:IPosition):boolean => {
      const positionData = getPositionData(position)
      const outBoundaries = !positionData

      return outBoundaries || getPositionData(position).obstacle
    }
    const obstacleHandler = (position:IPosition) => {
      const missionState:IMissionResult = {
        state: MissionState.OBSTACLE,
        message: missionObstacle(position)
      }
      setMissionState(missionState)
    }
    const clearCommands = () => ''
    const performMission = (commands:string) => {
      let { startPosition: position, orientation } = store.getters.missionData
      let pendingCommands = commands

      while (missionPending(pendingCommands)) {
        const nextCommand:string = getNextCommand(pendingCommands)
        storeMovement({ ...store.getters.missionData.startPosition })
        const movement:IPosition = performMovement(nextCommand, orientation, position)
        position = { ...movement }

        if (obstacleFound(position)) {
          obstacleHandler(position)
          pendingCommands = clearCommands()
        } else {
          storeMovement(position)
          pendingCommands = removeCommand(pendingCommands)
        }
      }
      if (pendingCommands.length === 0 && store.getters.missionState.state !== MissionState.OBSTACLE) {
        const missionState:IMissionResult = {
          state: MissionState.SUCCESS,
          message: missionSuccess()
        }
        setMissionState(missionState)
      }
    }
    const storeMovement = (position:IPosition) => store.dispatch('pushPosition', position)
    const setMissionState = (missionState:IMissionResult) => store.dispatch('setMissionState', missionState)
    emit.on('start-mission', (_mission:IMission) => {
      mission.value = _mission
      performMission(mission.value.commands)
    })

    return { map, mapSize, mapGenerated }
  }
})
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  flex-flow: row;
}
</style>
