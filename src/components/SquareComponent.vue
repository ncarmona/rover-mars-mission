<template>
  <div :class="isObstacle">
    <span v-if="isLastRoverPosition">X</span>
  </div>
</template>

<script lang="ts">
import { ISquare } from '@/interfaces/ISquare'
import { computed, defineComponent } from 'vue'
import { Store, useStore } from 'vuex'

export default defineComponent({
  props: {
    square: {
      required: true,
      type: Object as () => ISquare
    }
  },
  setup (prop) {
    const store:Store<any> = useStore()
    const isObstacle = computed(() => prop.square.obstacle ? 'obstacle' : '')
    const isLastRoverPosition = computed(() => {
      const { x: roverX, y: roverY } = store.getters.lastRoverPosition
      const { x: squareX, y: squareY } = prop.square.position
      return roverX === squareX && roverY === squareY
    })

    return { isObstacle, isLastRoverPosition }
  }
})
</script>

<style lang="scss" scoped>
.obstacle {
  background-color: gray;
}
div {
  border: 1px solid black;
  width: 20px;
  height: 20px;
}
</style>
