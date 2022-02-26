<template>
  <div>
    <label for="commands">Commands:</label>
    <input type="text" id="commands" v-model="commands" v-on:keyup="keyupHandler">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { Commands } from '../constants/commands'
import { Store, useStore } from 'vuex'

export default defineComponent({
  setup () {
    const commands:Ref<string> = ref('')
    const store:Store<any> = useStore()

    const keyupHandler = () => {
      if (!validateCommand(lastCommand(commands.value))) commands.value = removeLastCommand()
      else storeCommands()
    }
    const lastCommand = (nextValue:string):string => nextValue[nextValue.length - 1]
    const removeLastCommand = ():string => commands.value.slice(0, -1)
    const validateCommand = (command:string):boolean => Object.values(Commands).some((c:string) => c === command) ?? false
    const storeCommands = () => { store.dispatch('setCommands', commands.value) }

    return { commands, keyupHandler }
  }
})
</script>
