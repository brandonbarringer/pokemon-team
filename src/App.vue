<template>
  <div id="app">
    <PokemonList />
  </div>
</template>

<script>
  import PokemonList from './components/PokemonList.vue';

  export default {
    name: 'app',
    components: {
      PokemonList
    }
  }
</script>

<style lang="sass">
  *
    margin: 0
  ul
    list-style-type: none
    padding: 0
  [v-cloak] > *
    display: none
  #app
    
</style>