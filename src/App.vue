<template>
  <div id="app">
    <!-- <PokemonCard /> -->
    <GrassAnimation />
  </div>
</template>

<script>
  // import PokemonCard from './components/PokemonCard.vue';
  import GrassAnimation from './components/GrassAnimation.vue';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      // PokemonCard
      GrassAnimation
    }
  }
</script>

<style lang="sass">
  *
    margin: 0
  ul
    list-style-type: none
    padding: 0
  body, html 
    width: 100%
    height: 100%
  #app
    width: 50vw
    height: 50vh
    position: relative
    top: 25vh
    left: 25vw
    background-color: #eee
</style>