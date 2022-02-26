<template>
  <div>
    <button v-on:click="startMission">Start mission!</button>
    <span v-show="invalidMissionParameters" class="error block">Invalid mission parameters!</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { Store, useStore } from 'vuex'
import { IMissionResult } from '../interfaces/IMissionResult'
import { map } from '../helpers/map'
import { MissionState } from '@/constants/missionStates'
import { missionPending } from '@/helpers/missionMessages'
import { IMission } from '@/interfaces/IMission'
import { IPosition } from '@/interfaces/IPosition'
import { config } from '@/config'

export default defineComponent({
  setup () {
    const { generateMapArray } = map()
    const store:Store<any> = useStore()
    const emit:any = inject('emit')
    const invalidMissionParameters:Ref<boolean> = ref(false)

    const isValidCommands = (commands:string): boolean => commands.trim() !== ''
    const isValidStartPosition = (startPosition: IPosition): boolean => {
      const { x, y } = startPosition
      return x >= 0 && y >= 0 && x < config.mapSize && y < config.mapSize
    }
    const validateMission = (mission:IMission): boolean => {
      const { commands, startPosition } = mission
      return isValidStartPosition(startPosition) && isValidCommands(commands)
    }
    const startMission = () => {
      const missionData: IMission = store.getters.missionData
      const validMissionParameters = validateMission(missionData)
      invalidMissionParameters.value = false
      if (validMissionParameters) {
        const missionState:IMissionResult = {
          state: MissionState.PENDING,
          message: missionPending()
        }
        const initialPosition: IPosition = missionData.startPosition
        const map:any[][] = generateMapArray(initialPosition)
        store.dispatch('setMap', map)
        store.dispatch('setMissionState', missionState)
        emit.emit('start-mission', store.getters.missionData)
      } else {
        invalidMissionParameters.value = true
      }
    }

    return { startMission, invalidMissionParameters }
  }
})
</script>

<style lang="scss" scoped>
div { min-height: 40px; }
.error {
  font-style: italic;
  color: red;
}
.block { display: block; }
</style>
