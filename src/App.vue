<template>
  <div id="app">
    <!-- <PokemonCard /> -->
    <PokemonList />
    <!-- <GrassAnimation /> -->
  </div>
</template>

<script>
  import PokemonList from './components/PokemonList.vue';
  // import PokemonCard from './components/PokemonCard.vue';
  // import GrassAnimation from './components/GrassAnimation.vue';

  export default {
    name: 'app',
    components: {
      // PokemonCard
      PokemonList
      // GrassAnimation
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