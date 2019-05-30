<template>
  <div id="app">
    <!-- <PokemonList /> -->
    <ul class="list">
      <li class="list-item" v-for="item in 1">
        <ExpandingCard>
          <CardPreview>
            <template v-slot="focus">
              <img class="img" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png" alt="">
            </template>
            <template v-slot="previewContent">I am some preview content</template>
          </CardPreview>
          <CardDetails>
            <ul class="detail-list full">
              <li class="detail-block"></li>
              <li class="detail-block"></li>
              <li class="detail-block"></li>
              <li class="detail-block"></li>
            </ul>
          </CardDetails>
        </ExpandingCard>
      </li>
    </ul>
        
  </div>
</template>

<script>
  // import PokemonList from './components/PokemonList.vue';
  import ExpandingCard from './components/expanding-card/ExpandingCard.vue';
  import CardPreview from './components/expanding-card/CardPreview.vue';
  import CardDetails from './components/expanding-card/CardDetails.vue';

  export default {
    name: 'app',
    components: {
      ExpandingCard,
      CardPreview,
      CardDetails
    },
  }
</script>

<style lang="sass">
 @import 'public/assets/sass/reset.sass'
    
</style>