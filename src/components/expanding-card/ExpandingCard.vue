<template>
  <article class="card">
  	<div class="wrapper">
  		<slot class="content" name="content">
  			
		</slot>
  	</div>
  </article>
</template>

<script>
	export default {
		name: 'ExpandingCard'
	}
</script>

<style>
 /*@import 'public/assets/sass/expanding-card.sass'*/
</style>