<template>
  {{missionState}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Store, useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store:Store<any> = useStore()
    const missionState = computed(() => store.getters.missionState.message)

    return { missionState }
  }
})
</script>
