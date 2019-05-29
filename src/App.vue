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
    },
  }
</script>

<style lang="sass">
 @import 'public/assets/sass/reset.sass'
    
</style>