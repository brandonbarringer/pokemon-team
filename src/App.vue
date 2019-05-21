<template>
  <div id="app">
    <PokemonList />
  </div>
</template>

<script>
  import PokemonList from './components/PokemonList.vue';
  import axios from 'axios';

  export default {
    name: 'app',
    components: {
      PokemonList
    }
  }
</script>