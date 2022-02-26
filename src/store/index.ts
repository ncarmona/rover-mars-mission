import { IMission } from '@/interfaces/IMission'
import { IPosition } from '@/interfaces/IPosition'
import { ISquare } from '@/interfaces/ISquare'
import { createStore } from 'vuex'
import { actions } from './actions'
import { getters } from './getters'
import { mutations } from './mutations'
import { state } from './state'

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
})
