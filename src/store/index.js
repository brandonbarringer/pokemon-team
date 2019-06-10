import Vue from 'vue'
import Vuex from 'vuex'
import PokemonList from './modules/PokemonList'
import PokemonDetail from './modules/PokemonDetail'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    PokemonList,
    PokemonDetail
  },
  strict: debug
})