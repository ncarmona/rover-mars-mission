import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import mitt from 'mitt'

createApp(App).use(store).provide('emit', mitt()).mount('#app')
