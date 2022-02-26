<template>
  <div>
    <Axis-start class="axis" labelText="x:" axisName="x"/>
    <Axis-start class="axis" labelText="y:" axisName="y"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AxisStartPositionControlComponentVue from './AxisStartPositionControlComponent.vue'

export default defineComponent({
  components: {
    'Axis-start': AxisStartPositionControlComponentVue
  }
})
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: row;
  .axis {
    margin-right: 10px;
  }
}
</style>
