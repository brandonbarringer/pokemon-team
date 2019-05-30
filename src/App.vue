<template>
  <div id="app">
    <!-- <PokemonList /> -->
    <ul class="list">
      <li class="list-item" v-for="item in 30">
        <ExpandingCard />
      </li>
    </ul>
        
  </div>
</template>

<script>
  // import PokemonList from './components/PokemonList.vue';
  import ExpandingCard from './components/ExpandingCard.vue';

  export default {
    name: 'app',
    components: {
      ExpandingCard
    },
  }
</script>

<style lang="sass">
 @import 'public/assets/sass/reset.sass'
    
</style>