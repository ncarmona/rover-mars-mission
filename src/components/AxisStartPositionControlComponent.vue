<template>
  <div>
    <label for="">{{labelText}}</label>
    <input type="number" name="" id="" :max="maxValue" min="0"  v-model="axis" />
  </div>
</template>

<script lang="ts">
import { config } from '@/config'
import { computed, defineComponent, ref, Ref, toRefs, watch } from 'vue'
import { Store, useStore } from 'vuex'

export default defineComponent({
  props: {
    labelText: {
      required: true
    },
    axisName: {
      required: true
    }
  },
  setup (props) {
    const store:Store<any> = useStore()
    const axis:Ref<number> = ref(0)

    const maxValue = computed(() => config.mapSize - 1)

    watch(axis, () => storeAxisCoord())
    const storeAxisCoord = () => {
      const axisData = {
        axis: props.axisName,
        value: axis.value
      }
      store.dispatch('setStartPosition', axisData)
    }
    return { axis, ...toRefs(props), maxValue }
  }
})
</script>

<style lang="scss" scoped>
input {
  width: 3rem;
}
</style>
