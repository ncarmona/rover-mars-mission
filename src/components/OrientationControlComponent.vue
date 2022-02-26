<template>
  <div>
    <label for="orientation">Orientation:</label>
    <select name="orientation" v-model="orientation">
      <option :value="Orientations.NORTH">North</option>
      <option :value="Orientations.EAST">East</option>
      <option :value="Orientations.SOUTH">South</option>
      <option :value="Orientations.WEST">West</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, watch } from 'vue'
import { Store, useStore } from 'vuex'
import { Orientations } from '../constants/orientations'

export default defineComponent({
  setup () {
    const orientation:Ref<string> = ref('n')
    const store:Store<any> = useStore()

    const storeOrientation = () => { store.dispatch('setOrientation', orientation.value) }
    watch(orientation, () => storeOrientation())

    return { orientation, Orientations }
  }
})
</script>
