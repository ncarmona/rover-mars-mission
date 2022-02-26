<template>
  <fieldset :disabled="isDisabled">
    <Commands-component />
    <Orientation-component />
    <Start-position-component />
    <Start-mission-component />
  </fieldset>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import CommandsControlComponent from './CommandsControlComponent.vue'
import OrientationControlComponent from './OrientationControlComponent.vue'
import StartPositionControlComponentVue from './StartPositionControlComponent.vue'
import StartMissionControlComponentVue from './StartMissionControlComponent.vue'
import { Store, useStore } from 'vuex'
import { MissionState } from '@/constants/missionStates'

export default defineComponent({
  components: {
    'Commands-component': CommandsControlComponent,
    'Orientation-component': OrientationControlComponent,
    'Start-position-component': StartPositionControlComponentVue,
    'Start-mission-component': StartMissionControlComponentVue
  },
  setup () {
    const store:Store<any> = useStore()

    const isDisabled = computed(() => store.getters.missionState.state === MissionState.PENDING)

    return { isDisabled }
  }
})
</script>

<style lang="scss" scoped>
fieldset {
  border: 0;
}
</style>
