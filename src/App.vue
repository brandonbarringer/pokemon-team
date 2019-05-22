<template>
  <div id="app">
    <PokemonCard />
  </div>
</template>

<script>
  import PokemonCard from './components/PokemonCard.vue';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      PokemonCard
    }
  }
</script>

<style lang="sass">
  *
    margin: 0
  ul
    list-style-type: none
    padding: 0
</style>