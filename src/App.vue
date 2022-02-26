<template>
  <div id='app'>
    <div>
      <ControlsComponent />
    </div>
    <div>
      <MissionReporterComponent />
    </div>
    <div>
      <MapComponent />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import MapComponent from './components/MapComponent.vue'
import ControlsComponent from './components/ControlsComponent.vue'
import MissionReporterComponent from './components/MissionReporterComponent.vue'
export default defineComponent({
  name: 'App',
  components: {
    MapComponent,
    ControlsComponent,
    MissionReporterComponent
  }
})
</script>

<style lang='scss'>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
